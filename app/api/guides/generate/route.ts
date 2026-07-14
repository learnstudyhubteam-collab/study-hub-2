import { generateText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { createClient } from '@/lib/supabase/server'
import { getModelForPlan, PLAN_LIMITS } from '@/lib/tier'
import type { SubscriptionPlan } from '@/lib/tier'

// ── Curriculum standards by US state ─────────────────────────────────────────
interface StateCurriculum {
  name: string
  math: string
  science: string
  ela: string
  socialStudies: string
  assessments: string
  notes: string
}

const STATE_CURRICULUM: Record<string, StateCurriculum> = {
  AL: { name: 'Alabama', math: 'Alabama Course of Study: Mathematics', science: 'Alabama Course of Study: Science', ela: 'Alabama Course of Study: English Language Arts', socialStudies: 'Alabama Course of Study: Social Studies', assessments: 'ACT Aspire', notes: 'Alabama adopted its own standards rather than Common Core.' },
  AK: { name: 'Alaska', math: 'Alaska Mathematics Standards', science: 'Alaska Science Standards (NGSS-aligned)', ela: 'Alaska English Language Arts Standards', socialStudies: 'Alaska Social Studies Standards', assessments: 'Alaska System of Academic Readiness (AK STAR)', notes: 'Alaska uses its own standards framework.' },
  AZ: { name: 'Arizona', math: 'Arizona Mathematics Standards', science: 'Arizona Science Standards (NGSS-aligned)', ela: 'Arizona English Language Arts Standards', socialStudies: 'Arizona Social Studies Standards', assessments: 'AzM2 (Arizona Measurement of Educational Readiness to Inform Teaching)', notes: 'Arizona adopted revised standards in 2016.' },
  AR: { name: 'Arkansas', math: 'Arkansas Mathematics Standards', science: 'Arkansas Science Standards', ela: 'Arkansas English Language Arts Standards', socialStudies: 'Arkansas Social Studies Standards', assessments: 'ACT Aspire', notes: 'Arkansas standards are Common Core-aligned.' },
  CA: { name: 'California', math: 'California Common Core State Standards for Mathematics', science: 'California NGSS (Next Generation Science Standards)', ela: 'California Common Core ELA/Literacy Standards', socialStudies: 'California History-Social Science Framework', assessments: 'CAASPP (California Assessment of Student Performance and Progress)', notes: 'California uses Common Core for Math/ELA and full NGSS for Science. CAASPP Smarter Balanced assessments.' },
  CO: { name: 'Colorado', math: 'Colorado Academic Standards: Mathematics', science: 'Colorado Academic Standards: Science (NGSS-aligned)', ela: 'Colorado Academic Standards: Reading, Writing, and Communicating', socialStudies: 'Colorado Academic Standards: Social Studies', assessments: 'CMAS (Colorado Measures of Academic Success)', notes: 'Colorado adopted its own standards; math is Common Core-aligned.' },
  CT: { name: 'Connecticut', math: 'Connecticut Common Core Standards: Mathematics', science: 'Connecticut Science Curriculum Framework (NGSS-aligned)', ela: 'Connecticut Common Core ELA Standards', socialStudies: 'Connecticut Social Studies Frameworks', assessments: 'SBAC (Smarter Balanced Assessment Consortium)', notes: 'Connecticut uses Common Core and NGSS.' },
  DE: { name: 'Delaware', math: 'Delaware Common Core State Standards: Mathematics', science: 'Delaware Science Standards (NGSS)', ela: 'Delaware ELA Common Core Standards', socialStudies: 'Delaware Social Studies Standards', assessments: 'DCAS (Delaware Comprehensive Assessment System)', notes: 'Delaware uses Common Core and NGSS.' },
  FL: { name: 'Florida', math: 'Florida BEST Standards: Mathematics (B.E.S.T.)', science: 'Florida Next Generation Sunshine State Standards: Science', ela: 'Florida BEST Standards: English Language Arts', socialStudies: 'Florida Next Generation Sunshine State Standards: Social Studies', assessments: 'FAST (Florida Assessment of Student Thinking)', notes: 'Florida uses its own BEST standards, not Common Core. FAST replaced FSA in 2022.' },
  GA: { name: 'Georgia', math: 'Georgia Standards of Excellence: Mathematics', science: 'Georgia Standards of Excellence: Science (NGSS-aligned)', ela: 'Georgia Standards of Excellence: ELA', socialStudies: 'Georgia Standards of Excellence: Social Studies', assessments: 'Georgia Milestones Assessment System', notes: 'Georgia revised its standards in 2015. Uses Georgia Milestones for state assessments.' },
  HI: { name: 'Hawaii', math: 'Hawaii Common Core State Standards: Mathematics', science: 'Hawaii NGSS Science Standards', ela: 'Hawaii Common Core ELA Standards', socialStudies: 'Hawaii Social Studies Standards', assessments: 'HSA (Hawaii State Assessment)', notes: 'Hawaii uses Common Core and NGSS.' },
  ID: { name: 'Idaho', math: 'Idaho Content Standards: Mathematics', science: 'Idaho Content Standards: Science', ela: 'Idaho Content Standards: ELA', socialStudies: 'Idaho Content Standards: Social Studies', assessments: 'ISAT (Idaho Standards Achievement Tests)', notes: 'Idaho uses its own content standards.' },
  IL: { name: 'Illinois', math: 'Illinois Learning Standards: Mathematics (Common Core)', science: 'Illinois Learning Standards: Science (NGSS)', ela: 'Illinois Learning Standards: ELA (Common Core)', socialStudies: 'Illinois Learning Standards: Social Science', assessments: 'IAR (Illinois Assessment of Readiness)', notes: 'Illinois uses Common Core and NGSS.' },
  IN: { name: 'Indiana', math: 'Indiana Academic Standards: Mathematics', science: 'Indiana Academic Standards: Science', ela: 'Indiana Academic Standards: English/Language Arts', socialStudies: 'Indiana Academic Standards: Social Studies', assessments: 'ILEARN (Indiana Learning Evaluation Assessment Readiness Network)', notes: 'Indiana withdrew from Common Core in 2014 and adopted its own standards.' },
  IA: { name: 'Iowa', math: 'Iowa Core: Mathematics', science: 'Iowa Core: Science (NGSS-aligned)', ela: 'Iowa Core: Literacy', socialStudies: 'Iowa Core: Social Studies', assessments: 'Iowa Statewide Assessment of Student Progress (ISASP)', notes: 'Iowa Core is Common Core-aligned.' },
  KS: { name: 'Kansas', math: 'Kansas Mathematics Standards', science: 'Kansas Science Standards (NGSS)', ela: 'Kansas ELA Standards', socialStudies: 'Kansas Social Studies Standards', assessments: 'Kansas Assessment Program (KAP)', notes: 'Kansas uses NGSS and its own ELA/Math standards.' },
  KY: { name: 'Kentucky', math: 'Kentucky Academic Standards: Mathematics', science: 'Kentucky Academic Standards: Science (NGSS-aligned)', ela: 'Kentucky Academic Standards: ELA', socialStudies: 'Kentucky Academic Standards: Social Studies', assessments: 'KSA (Kentucky Student Assessment)', notes: 'Kentucky standards are Common Core-aligned.' },
  LA: { name: 'Louisiana', math: 'Louisiana Student Standards: Mathematics', science: 'Louisiana Student Standards: Science (NGSS-aligned)', ela: 'Louisiana Student Standards: ELA', socialStudies: 'Louisiana Student Standards: Social Studies', assessments: 'LEAP 2025', notes: 'Louisiana uses its own Louisiana Student Standards.' },
  ME: { name: 'Maine', math: 'Maine Learning Results: Mathematics (Common Core)', science: 'Maine Learning Results: Science and Technology (NGSS-aligned)', ela: 'Maine Learning Results: ELA', socialStudies: 'Maine Learning Results: Social Studies', assessments: 'Maine Science Assessment', notes: 'Maine uses Common Core and NGSS-aligned standards.' },
  MD: { name: 'Maryland', math: 'Maryland College and Career Ready Standards: Mathematics', science: 'Maryland Science Standards (NGSS)', ela: 'Maryland College and Career Ready Standards: ELA', socialStudies: 'Maryland Social Studies Standards', assessments: 'MCAP (Maryland Comprehensive Assessment Program)', notes: 'Maryland uses Common Core and full NGSS.' },
  MA: { name: 'Massachusetts', math: 'Massachusetts Curriculum Frameworks: Mathematics', science: 'Massachusetts Science and Technology/Engineering Curriculum Framework (NGSS-aligned)', ela: 'Massachusetts Curriculum Frameworks: ELA', socialStudies: 'Massachusetts History and Social Science Curriculum Framework', assessments: 'MCAS (Massachusetts Comprehensive Assessment System)', notes: 'Massachusetts has its own highly-regarded frameworks. MCAS is one of the most rigorous state assessments.' },
  MI: { name: 'Michigan', math: 'Michigan K-12 Standards: Mathematics', science: 'Michigan K-12 Science Standards (NGSS)', ela: 'Michigan K-12 ELA Standards', socialStudies: 'Michigan K-12 Social Studies Standards', assessments: 'M-STEP (Michigan Student Test of Educational Progress)', notes: 'Michigan uses Common Core and full NGSS.' },
  MN: { name: 'Minnesota', math: 'Minnesota K-12 Academic Standards: Mathematics', science: 'Minnesota K-12 Academic Standards: Science', ela: 'Minnesota K-12 Academic Standards: ELA', socialStudies: 'Minnesota K-12 Academic Standards: Social Studies', assessments: 'MCA (Minnesota Comprehensive Assessments)', notes: 'Minnesota uses its own standards, not Common Core.' },
  MS: { name: 'Mississippi', math: 'Mississippi College and Career Readiness Standards: Mathematics', science: 'Mississippi College and Career Readiness Standards: Science', ela: 'Mississippi College and Career Readiness Standards: ELA', socialStudies: 'Mississippi College and Career Readiness Standards: Social Studies', assessments: 'MAAP (Mississippi Academic Assessment Program)', notes: 'Mississippi uses its own College and Career Readiness standards.' },
  MO: { name: 'Missouri', math: 'Missouri Learning Standards: Mathematics', science: 'Missouri Learning Standards: Science (NGSS-inspired)', ela: 'Missouri Learning Standards: ELA', socialStudies: 'Missouri Learning Standards: Social Studies', assessments: 'MAP (Missouri Assessment Program)', notes: 'Missouri revised its standards in 2016.' },
  MT: { name: 'Montana', math: 'Montana Common Core Standards: Mathematics', science: 'Montana Science Standards (NGSS-aligned)', ela: 'Montana Common Core Standards: ELA', socialStudies: 'Montana Social Studies Standards', assessments: 'MontCAS', notes: 'Montana uses Common Core and emphasizes Native American studies.' },
  NE: { name: 'Nebraska', math: 'Nebraska College and Career Ready Standards: Mathematics', science: 'Nebraska College and Career Ready Standards: Science', ela: 'Nebraska College and Career Ready Standards: ELA', socialStudies: 'Nebraska Social Studies Standards', assessments: 'NSCAS (Nebraska Student-Centered Assessment System)', notes: 'Nebraska uses its own standards.' },
  NV: { name: 'Nevada', math: 'Nevada Academic Content Standards: Mathematics', science: 'Nevada Academic Content Standards: Science (NGSS)', ela: 'Nevada Academic Content Standards: ELA', socialStudies: 'Nevada Social Studies Standards', assessments: 'SBAC (Smarter Balanced)', notes: 'Nevada uses Common Core and NGSS.' },
  NH: { name: 'New Hampshire', math: 'New Hampshire Mathematics Curriculum Frameworks (Common Core)', science: 'New Hampshire Science Curriculum Frameworks (NGSS)', ela: 'New Hampshire ELA Curriculum Frameworks', socialStudies: 'New Hampshire Social Studies Frameworks', assessments: 'NH SAS (Student Assessment System) / SBAC', notes: 'New Hampshire uses Common Core and NGSS.' },
  NJ: { name: 'New Jersey', math: 'New Jersey Student Learning Standards: Mathematics', science: 'New Jersey Student Learning Standards: Science (NGSS)', ela: 'New Jersey Student Learning Standards: ELA', socialStudies: 'New Jersey Student Learning Standards: Social Studies', assessments: 'NJSLA (New Jersey Student Learning Assessments)', notes: 'New Jersey uses its own NJSLS, aligned to Common Core and NGSS.' },
  NM: { name: 'New Mexico', math: 'New Mexico Mathematics Standards', science: 'New Mexico Science Standards (NGSS)', ela: 'New Mexico ELA Standards', socialStudies: 'New Mexico Social Studies Standards', assessments: 'NM-MSSA (New Mexico Measures of Student Success and Achievement)', notes: 'New Mexico uses its own standards.' },
  NY: { name: 'New York', math: 'New York State Next Generation Mathematics Learning Standards', science: 'New York State P-12 Science Learning Standards (NGSS)', ela: 'New York State Next Generation ELA Learning Standards', socialStudies: 'New York State K-12 Social Studies Framework', assessments: 'NY Regents Exams, Grade 3-8 ELA and Math assessments', notes: 'New York uses its own Next Generation Standards. Regents Exams are required for high school graduation.' },
  NC: { name: 'North Carolina', math: 'North Carolina Standard Course of Study: Mathematics', science: 'North Carolina Essential Standards: Science', ela: 'North Carolina Standard Course of Study: ELA', socialStudies: 'North Carolina Essential Standards: Social Studies', assessments: 'NC EOG (End-of-Grade) and NC EOC (End-of-Course)', notes: 'North Carolina uses its own Standard Course of Study.' },
  ND: { name: 'North Dakota', math: 'North Dakota Mathematics Content Standards', science: 'North Dakota Science Content Standards (NGSS-aligned)', ela: 'North Dakota ELA Content Standards', socialStudies: 'North Dakota Social Studies Standards', assessments: 'NDSA (North Dakota State Assessment)', notes: 'North Dakota uses Common Core-aligned standards.' },
  OH: { name: 'Ohio', math: 'Ohio Learning Standards: Mathematics', science: 'Ohio Learning Standards: Science', ela: 'Ohio Learning Standards: ELA', socialStudies: 'Ohio Learning Standards: Social Studies', assessments: 'Ohio State Tests', notes: 'Ohio adopted its own learning standards based on Common Core.' },
  OK: { name: 'Oklahoma', math: 'Oklahoma Academic Standards: Mathematics', science: 'Oklahoma Academic Standards: Science', ela: 'Oklahoma Academic Standards: ELA', socialStudies: 'Oklahoma Academic Standards: Social Studies', assessments: 'Oklahoma School Testing Program (OSTP)', notes: 'Oklahoma withdrew from Common Core; uses its own standards.' },
  OR: { name: 'Oregon', math: 'Oregon Mathematics Standards (Common Core)', science: 'Oregon Science Standards (NGSS)', ela: 'Oregon ELA Standards (Common Core)', socialStudies: 'Oregon Social Studies Standards', assessments: 'Oregon Statewide Assessment System (OSAS)', notes: 'Oregon uses Common Core and NGSS.' },
  PA: { name: 'Pennsylvania', math: 'Pennsylvania Core Standards: Mathematics', science: 'Pennsylvania Academic Standards: Science', ela: 'Pennsylvania Core Standards: ELA', socialStudies: 'Pennsylvania Academic Standards: Social Studies', assessments: 'PSSA (Pennsylvania System of School Assessment)', notes: 'Pennsylvania Core Standards are closely aligned to Common Core.' },
  RI: { name: 'Rhode Island', math: 'Rhode Island Common Core Standards: Mathematics', science: 'Rhode Island Science Standards (NGSS)', ela: 'Rhode Island Common Core ELA Standards', socialStudies: 'Rhode Island Social Studies Standards', assessments: 'RICAS (Rhode Island Comprehensive Assessment System)', notes: 'Rhode Island uses Common Core and NGSS.' },
  SC: { name: 'South Carolina', math: 'South Carolina College and Career Ready Standards: Mathematics', science: 'South Carolina Academic Standards: Science', ela: 'South Carolina College and Career Ready Standards: ELA', socialStudies: 'South Carolina Social Studies Standards', assessments: 'SC READY and SC PASS assessments', notes: 'South Carolina uses its own standards.' },
  SD: { name: 'South Dakota', math: 'South Dakota Mathematics Standards', science: 'South Dakota Science Standards (NGSS-aligned)', ela: 'South Dakota ELA Standards', socialStudies: 'South Dakota Social Studies Standards', assessments: 'South Dakota Smarter Balanced', notes: 'South Dakota uses Common Core-aligned standards.' },
  TN: { name: 'Tennessee', math: 'Tennessee Academic Standards: Mathematics', science: 'Tennessee Academic Standards: Science (NGSS-aligned)', ela: 'Tennessee Academic Standards: ELA', socialStudies: 'Tennessee Academic Standards: Social Studies', assessments: 'TNReady', notes: 'Tennessee uses its own standards. TNReady tests are used for accountability.' },
  TX: { name: 'Texas', math: 'Texas Essential Knowledge and Skills (TEKS): Mathematics', science: 'Texas Essential Knowledge and Skills (TEKS): Science', ela: 'Texas Essential Knowledge and Skills (TEKS): ELA', socialStudies: 'Texas Essential Knowledge and Skills (TEKS): Social Studies', assessments: 'STAAR (State of Texas Assessments of Academic Readiness)', notes: 'Texas uses TEKS, NOT Common Core. STAAR tests are high-stakes in Texas.' },
  UT: { name: 'Utah', math: 'Utah Core Standards: Mathematics', science: 'Utah Core Standards: Science (NGSS-aligned)', ela: 'Utah Core Standards: ELA', socialStudies: 'Utah Core Standards: Social Studies', assessments: 'RISE (Readiness Improvement Success Empowerment) Assessment', notes: 'Utah uses its own Core Standards.' },
  VT: { name: 'Vermont', math: 'Vermont Common Core Standards: Mathematics', science: 'Vermont Science Standards (NGSS)', ela: 'Vermont Common Core ELA Standards', socialStudies: 'Vermont Social Studies Standards', assessments: 'SBAC (Smarter Balanced)', notes: 'Vermont uses Common Core and NGSS.' },
  VA: { name: 'Virginia', math: 'Virginia Standards of Learning (SOL): Mathematics', science: 'Virginia Standards of Learning (SOL): Science', ela: 'Virginia Standards of Learning (SOL): English', socialStudies: 'Virginia Standards of Learning (SOL): History and Social Science', assessments: 'Virginia SOL Assessments', notes: 'Virginia uses its own SOL framework, NOT Common Core. SOL tests are mandatory for accreditation. Covers specific Virginia history content (Jamestown, Civil War in Virginia, etc.).' },
  WA: { name: 'Washington', math: 'Washington State Common Core Mathematics Standards', science: 'Washington State Science Learning Standards (NGSS)', ela: 'Washington State ELA Standards (Common Core)', socialStudies: 'Washington State Social Studies Standards', assessments: 'Washington Comprehensive Assessment Program (WCAP)', notes: 'Washington uses Common Core and NGSS.' },
  WV: { name: 'West Virginia', math: 'West Virginia College and Career Readiness Standards: Mathematics', science: 'West Virginia Science Standards (NGSS-aligned)', ela: 'West Virginia College and Career Readiness Standards: ELA', socialStudies: 'West Virginia Social Studies Standards', assessments: 'West Virginia General Summative Assessment (WVGSA)', notes: 'West Virginia uses its own College and Career Readiness standards.' },
  WI: { name: 'Wisconsin', math: 'Wisconsin Academic Standards: Mathematics', science: 'Wisconsin Academic Standards: Science (NGSS-aligned)', ela: 'Wisconsin Academic Standards: ELA', socialStudies: 'Wisconsin Academic Standards: Social Studies', assessments: 'Wisconsin Forward Exam', notes: 'Wisconsin uses its own standards.' },
  WY: { name: 'Wyoming', math: 'Wyoming Mathematics Content and Performance Standards', science: 'Wyoming Science Content and Performance Standards (NGSS-aligned)', ela: 'Wyoming ELA Content and Performance Standards', socialStudies: 'Wyoming Social Studies Content and Performance Standards', assessments: 'WY-TOPP (Wyoming Test of Proficiency and Progress)', notes: 'Wyoming uses its own standards.' },
  DC: { name: 'Washington D.C.', math: 'DC Common Core Standards: Mathematics', science: 'DC Science Standards (NGSS)', ela: 'DC Common Core ELA Standards', socialStudies: 'DC Social Studies Standards', assessments: 'DC CAPE (Comprehensive Assessment of Progress in Education)', notes: 'DC uses Common Core and NGSS.' },
}

const STATE_NAMES: Record<string, string> = {
  alabama: 'AL', alaska: 'AK', arizona: 'AZ', arkansas: 'AR', california: 'CA',
  colorado: 'CO', connecticut: 'CT', delaware: 'DE', florida: 'FL', georgia: 'GA',
  hawaii: 'HI', idaho: 'ID', illinois: 'IL', indiana: 'IN', iowa: 'IA',
  kansas: 'KS', kentucky: 'KY', louisiana: 'LA', maine: 'ME', maryland: 'MD',
  massachusetts: 'MA', michigan: 'MI', minnesota: 'MN', mississippi: 'MS',
  missouri: 'MO', montana: 'MT', nebraska: 'NE', nevada: 'NV',
  'new hampshire': 'NH', 'new jersey': 'NJ', 'new mexico': 'NM', 'new york': 'NY',
  'north carolina': 'NC', 'north dakota': 'ND', ohio: 'OH', oklahoma: 'OK',
  oregon: 'OR', pennsylvania: 'PA', 'rhode island': 'RI', 'south carolina': 'SC',
  'south dakota': 'SD', tennessee: 'TN', texas: 'TX', utah: 'UT',
  vermont: 'VT', virginia: 'VA', washington: 'WA', 'west virginia': 'WV',
  wisconsin: 'WI', wyoming: 'WY', 'washington dc': 'DC', 'district of columbia': 'DC',
}

// Well-known county → state mappings for disambiguation
const COUNTY_TO_STATE: Record<string, string> = {
  'fairfax': 'VA', 'loudoun': 'VA', 'arlington': 'VA', 'prince william': 'VA',
  'montgomery': 'MD', 'anne arundel': 'MD', 'howard': 'MD',
  'los angeles': 'CA', 'san diego': 'CA', 'orange': 'CA', 'santa clara': 'CA',
  'miami-dade': 'FL', 'broward': 'FL', 'palm beach': 'FL', 'hillsborough': 'FL',
  'harris': 'TX', 'dallas': 'TX', 'bexar': 'TX', 'tarrant': 'TX',
  'maricopa': 'AZ', 'pima': 'AZ',
  'cook': 'IL', 'dupage': 'IL',
  'king': 'WA', 'pierce': 'WA',
  'clark': 'NV', 'washoe': 'NV',
  'multnomah': 'OR', 'lane': 'OR',
  'wake': 'NC', 'mecklenburg': 'NC',
  'gwinnett': 'GA', 'fulton': 'GA', 'cobb': 'GA',
  'shelby': 'TN', 'davidson': 'TN',
  'jefferson': 'AL', 'madison': 'AL',
  'east baton rouge': 'LA', 'jefferson parish': 'LA',
}

function detectState(county: string): string | null {
  if (!county) return null
  const lower = county.toLowerCase().trim()

  // "Fairfax County, VA" — two-letter abbreviation at end
  const abbrMatch = lower.match(/,?\s+([a-z]{2})$/)
  if (abbrMatch) {
    const code = abbrMatch[1].toUpperCase()
    if (STATE_CURRICULUM[code]) return code
  }

  // Full state name anywhere in the string
  for (const [name, code] of Object.entries(STATE_NAMES)) {
    if (lower.includes(name)) return code
  }

  // Well-known county names
  for (const [countyName, code] of Object.entries(COUNTY_TO_STATE)) {
    if (lower.includes(countyName)) return code
  }

  return null
}

function getCurriculumContext(
  county: string,
  gradeLevel: string,
  subject: string,
): string {
  const stateCode = detectState(county)
  const curriculum = stateCode ? STATE_CURRICULUM[stateCode] : null

  const lines: string[] = []
  lines.push(`School district/county: ${county}`)

  if (curriculum) {
    lines.push(`State: ${curriculum.name}`)
    lines.push(`${curriculum.notes}`)
    lines.push(`Standardized assessments: ${curriculum.assessments}`)

    const s = subject.toLowerCase()
    const isMath = /math|algebra|geometry|calculus|statistics|trigonometry|pre-?calc/i.test(s)
    const isSci = /science|biology|chemistry|physics|earth|environmental|anatomy/i.test(s)
    const isELA = /english|ela|reading|writing|literature|language arts|grammar/i.test(s)
    const isSS = /history|social studies|civics|geography|government|economics|world history/i.test(s)

    if (isMath) lines.push(`Applicable standards: ${curriculum.math}`)
    else if (isSci) lines.push(`Applicable standards: ${curriculum.science}`)
    else if (isELA) lines.push(`Applicable standards: ${curriculum.ela}`)
    else if (isSS) lines.push(`Applicable standards: ${curriculum.socialStudies}`)
    else {
      lines.push(`Math standards: ${curriculum.math}`)
      lines.push(`Science standards: ${curriculum.science}`)
      lines.push(`ELA standards: ${curriculum.ela}`)
    }

    lines.push(`IMPORTANT: Align this study guide to the specific ${curriculum.name} state standards and ${curriculum.assessments} test expectations.`)
    lines.push(`Reference the actual standards codes and vocabulary used in ${curriculum.name} curricula where applicable.`)
    lines.push(`Structure key concepts and practice questions to match the format and scope of ${curriculum.assessments}.`)
  } else {
    lines.push('Standards framework: Common Core State Standards (CCSS) and NGSS where applicable.')
    lines.push('Align content to Common Core expectations for the given subject and grade level.')
  }

  return lines.join('\n')
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  const { topic, subject, gradeLevel, extraContext, classId } = await req.json()

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return new Response('Unauthorized', { status: 401 })

  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_plan, subscription_status, county, grade_level')
    .eq('id', user.id).single()

  const status = profile?.subscription_status ?? 'free'
  const plan = (status === 'active' ? (profile?.subscription_plan ?? 'free') : 'free') as SubscriptionPlan
  const limits = PLAN_LIMITS[plan]

  if (!limits.aiGuideGen) {
    return Response.json({ error: 'AI study guide generation requires a Scholar or Sage plan.' }, { status: 403 })
  }

  const modelId = getModelForPlan(plan)

  const effectiveCounty = (profile?.county as string | null) ?? null
  const effectiveGrade = gradeLevel || (profile?.grade_level as string | null) || ''

  const curriculumBlock = effectiveCounty
    ? `\nCURRICULUM ALIGNMENT:\n${getCurriculumContext(effectiveCounty, effectiveGrade, subject ?? topic)}`
    : ''

  const { text } = await generateText({
    model: anthropic(modelId),
    prompt: `Create a comprehensive study guide for the following topic.

Topic: ${topic}
${subject ? `Subject: ${subject}` : ''}
${effectiveGrade ? `Grade level: ${effectiveGrade}` : ''}
${extraContext ? `Additional instructions: ${extraContext}` : ''}${curriculumBlock}

Structure the guide with these sections:
1. Overview & Key Concepts (brief intro, aligned to curriculum standards)
2. Core Content (main body — explain concepts clearly with examples matching the curriculum)
3. Standards-Aligned Key Terms & Definitions (vocabulary students must know for assessments)
4. Common Misconceptions & Exam Tips${effectiveCounty ? ` (specific to the applicable state assessment)` : ''}
5. Practice Questions (5 questions mirroring the style and difficulty of the applicable standardized test, with answers)
6. Summary & Key Takeaways

${effectiveCounty ? `The guide MUST be tailored to the exact curriculum standards and assessment expectations for the student's school district. Mention the specific standards framework being used.` : 'Make it comprehensive but easy to read.'}
Use clear headings, bullet points, and examples.
Tailor the complexity and vocabulary to the specified grade level.`,
  })

  // Optional class share: only allowed for the class's own teacher
  let shareClassId: string | null = null
  if (classId) {
    const { data: ownedClass } = await supabase
      .from('classes')
      .select('id')
      .eq('id', classId)
      .eq('teacher_id', user.id)
      .maybeSingle()
    shareClassId = ownedClass?.id ?? null
  }

  const { data, error } = await supabase.from('study_guides').insert({
    user_id: user.id,
    title: topic,
    content: text,
    subject: subject || null,
    class_id: shareClassId,
  }).select('*').single()

  if (error) return Response.json({ error: error.message }, { status: 500 })

  return Response.json(data)
}
