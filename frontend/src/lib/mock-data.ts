// ============================================================
// THE ADAPTIVE BRAIN — MOCK DATA
// Single source of truth for all frontend components
// ============================================================

const today = new Date().toISOString().split("T")[0];
const todayDate = new Date();

function daysFromNow(days: number): string {
  const d = new Date(todayDate);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function daysAgo(days: number): string {
  return daysFromNow(-days);
}

// ============================================================
// CURRENT USER
// ============================================================
export const currentUser = {
  id: "user_001",
  email: "alex.rivera@university.edu",
  name: "Alex Rivera",
  avatar: null,
  onboarding_completed: true,
  profile: {
    learning_modality: "mixed" as const,
    attention_span: 20,
    engagement_style: "gamified" as const,
    language: { primary: "english", comfort_level: "comfortable" as const },
    neurodivergent: {
      adhd: true,
      dyslexia: false,
      autism: false,
      other: false,
    },
    study_time: "evening" as const,
    motivation: "progress_stats" as const,
  },
  total_xp: 2450,
  current_streak: 7,
  longest_streak: 12,
  last_active_date: today,
  daily_xp_goal: 150,
  daily_xp_earned: 85,
};

// ============================================================
// ONBOARDING QUESTIONS
// ============================================================
export const onboardingQuestions = [
  {
    id: 1,
    question: "How do you learn best?",
    description: "This helps us choose the right content formats for you.",
    options: [
      { value: "visual", label: "Visual", description: "Diagrams, concept maps, videos", icon: "Eye" },
      { value: "auditory", label: "Auditory", description: "Lectures, audio explanations, discussions", icon: "Headphones" },
      { value: "reading", label: "Reading/Writing", description: "Notes, summaries, articles", icon: "BookOpen" },
      { value: "mixed", label: "A mix of everything", description: "Variety keeps me engaged", icon: "Shuffle" },
    ],
  },
  {
    id: 2,
    question: "How long can you typically focus before needing a break?",
    description: "We'll pace your sessions accordingly.",
    options: [
      { value: "10", label: "~10 minutes", description: "Short bursts work best", icon: "Zap" },
      { value: "20", label: "~20 minutes", description: "Moderate focus windows", icon: "Clock" },
      { value: "30", label: "~30 minutes", description: "I can go a while", icon: "Timer" },
      { value: "45", label: "45+ minutes", description: "Deep focus is my thing", icon: "Brain" },
    ],
  },
  {
    id: 3,
    question: "What keeps you motivated to study?",
    description: "We'll tailor your experience to what drives you.",
    options: [
      { value: "gamified", label: "Challenges & rewards", description: "XP, streaks, achievements", icon: "Trophy" },
      { value: "progress_stats", label: "Seeing my progress", description: "Stats, charts, mastery tracking", icon: "TrendingUp" },
      { value: "social", label: "Social accountability", description: "Study groups, leaderboards", icon: "Users" },
      { value: "minimal", label: "Just the content", description: "Keep it simple and focused", icon: "Target" },
    ],
  },
  {
    id: 4,
    question: "How comfortable are you with academic English?",
    description: "We can adjust the complexity of explanations.",
    options: [
      { value: "native", label: "Native/Fluent", description: "No adjustments needed", icon: "MessageCircle" },
      { value: "comfortable", label: "Comfortable", description: "I understand most academic text", icon: "BookOpen" },
      { value: "developing", label: "Developing", description: "Simpler language helps", icon: "Sprout" },
      { value: "beginner", label: "Beginner", description: "Please keep it very simple", icon: "Baby" },
    ],
  },
  {
    id: 5,
    question: "Do any of these apply to you? (Select all that apply)",
    description: "This helps us optimize your learning experience. Totally optional.",
    multiSelect: true,
    options: [
      { value: "adhd", label: "ADHD", description: "Shorter sessions, more variety", icon: "Sparkles" },
      { value: "dyslexia", label: "Dyslexia", description: "Adjusted text formatting", icon: "Type" },
      { value: "autism", label: "Autism", description: "Predictable structure, clear instructions", icon: "Grid3x3" },
      { value: "none", label: "None of these", description: "That's perfectly fine!", icon: "Check" },
    ],
  },
  {
    id: 6,
    question: "When do you usually study?",
    description: "We'll schedule reminders at your peak time.",
    options: [
      { value: "morning", label: "Morning", description: "Early bird gets the worm", icon: "Sunrise" },
      { value: "afternoon", label: "Afternoon", description: "Post-lunch productivity", icon: "Sun" },
      { value: "evening", label: "Evening", description: "Night owl vibes", icon: "Moon" },
      { value: "varies", label: "It varies", description: "No fixed schedule", icon: "Shuffle" },
    ],
  },
  {
    id: 7,
    question: "What's your main motivation for using this app?",
    description: "One last thing — what's driving you?",
    options: [
      { value: "exam_prep", label: "Exam preparation", description: "I have a specific exam coming up", icon: "GraduationCap" },
      { value: "understanding", label: "Deep understanding", description: "I want to really master the material", icon: "Lightbulb" },
      { value: "catching_up", label: "Catching up", description: "I've fallen behind and need to get back on track", icon: "FastForward" },
      { value: "revision", label: "Revision", description: "I know the material, just need to refresh", icon: "RefreshCw" },
    ],
  },
];

// ============================================================
// PROJECTS
// ============================================================
export const projects = [
  {
    id: "proj_001",
    user_id: "user_001",
    name: "Biology 101 Final",
    exam_date: daysFromNow(12),
    hours_per_day: 2,
    comfort_level: "intermediate" as const,
    readiness_score: 42,
    status: "active" as const,
    created_at: daysAgo(8),
    last_studied: daysAgo(0),
    total_topics: 10,
    topics_mastered: 3,
    total_study_time_minutes: 960,
    sessions_completed: 12,
    average_accuracy: 71,
  },
  {
    id: "proj_002",
    user_id: "user_001",
    name: "Organic Chemistry Midterm",
    exam_date: daysFromNow(5),
    hours_per_day: 3,
    comfort_level: "beginner" as const,
    readiness_score: 67,
    status: "active" as const,
    created_at: daysAgo(14),
    last_studied: daysAgo(1),
    total_topics: 8,
    topics_mastered: 5,
    total_study_time_minutes: 1560,
    sessions_completed: 18,
    average_accuracy: 64,
  },
  {
    id: "proj_003",
    user_id: "user_001",
    name: "History of Art Essay",
    exam_date: daysFromNow(22),
    hours_per_day: 1,
    comfort_level: "review" as const,
    readiness_score: 15,
    status: "active" as const,
    created_at: daysAgo(3),
    last_studied: daysAgo(2),
    total_topics: 6,
    topics_mastered: 0,
    total_study_time_minutes: 180,
    sessions_completed: 3,
    average_accuracy: 58,
  },
];

// ============================================================
// TOPICS (for Biology 101 project)
// ============================================================
export const topics = [
  {
    id: "topic_001",
    project_id: "proj_001",
    name: "Cell Structure",
    description: "The fundamental building blocks of life — organelles, membranes, and cellular organization.",
    difficulty: "foundational" as const,
    status: "mastered" as const,
    mastery_percentage: 95,
    path_order: 1,
    prerequisites: [],
    estimated_minutes: 25,
    time_spent_minutes: 40,
    questions_answered: 18,
    accuracy: 89,
  },
  {
    id: "topic_002",
    project_id: "proj_001",
    name: "Cell Membrane",
    description: "Transport mechanisms, phospholipid bilayer, osmosis, and diffusion.",
    difficulty: "foundational" as const,
    status: "mastered" as const,
    mastery_percentage: 88,
    path_order: 2,
    prerequisites: ["topic_001"],
    estimated_minutes: 30,
    time_spent_minutes: 45,
    questions_answered: 22,
    accuracy: 82,
  },
  {
    id: "topic_003",
    project_id: "proj_001",
    name: "DNA & RNA",
    description: "Nucleic acid structure, base pairing, replication, and transcription.",
    difficulty: "intermediate" as const,
    status: "mastered" as const,
    mastery_percentage: 82,
    path_order: 3,
    prerequisites: ["topic_001"],
    estimated_minutes: 35,
    time_spent_minutes: 55,
    questions_answered: 25,
    accuracy: 76,
  },
  {
    id: "topic_004",
    project_id: "proj_001",
    name: "Protein Synthesis",
    description: "Translation, ribosomes, codons, amino acids, and the central dogma.",
    difficulty: "intermediate" as const,
    status: "in_progress" as const,
    mastery_percentage: 55,
    path_order: 4,
    prerequisites: ["topic_003"],
    estimated_minutes: 40,
    time_spent_minutes: 30,
    questions_answered: 12,
    accuracy: 58,
  },
  {
    id: "topic_005",
    project_id: "proj_001",
    name: "Cell Division",
    description: "Mitosis, meiosis, cell cycle regulation, and checkpoints.",
    difficulty: "intermediate" as const,
    status: "in_progress" as const,
    mastery_percentage: 38,
    path_order: 5,
    prerequisites: ["topic_003"],
    estimated_minutes: 35,
    time_spent_minutes: 20,
    questions_answered: 8,
    accuracy: 50,
  },
  {
    id: "topic_006",
    project_id: "proj_001",
    name: "Genetics",
    description: "Mendelian genetics, Punnett squares, inheritance patterns, and genetic variation.",
    difficulty: "intermediate" as const,
    status: "not_started" as const,
    mastery_percentage: 0,
    path_order: 6,
    prerequisites: ["topic_005"],
    estimated_minutes: 40,
    time_spent_minutes: 0,
    questions_answered: 0,
    accuracy: 0,
  },
  {
    id: "topic_007",
    project_id: "proj_001",
    name: "Evolution",
    description: "Natural selection, speciation, adaptation, and evolutionary evidence.",
    difficulty: "advanced" as const,
    status: "locked" as const,
    mastery_percentage: 0,
    path_order: 7,
    prerequisites: ["topic_006"],
    estimated_minutes: 35,
    time_spent_minutes: 0,
    questions_answered: 0,
    accuracy: 0,
  },
  {
    id: "topic_008",
    project_id: "proj_001",
    name: "Ecology",
    description: "Ecosystems, food webs, population dynamics, and biomes.",
    difficulty: "advanced" as const,
    status: "locked" as const,
    mastery_percentage: 0,
    path_order: 8,
    prerequisites: ["topic_007"],
    estimated_minutes: 30,
    time_spent_minutes: 0,
    questions_answered: 0,
    accuracy: 0,
  },
  {
    id: "topic_009",
    project_id: "proj_001",
    name: "Enzymes",
    description: "Enzyme kinetics, active sites, inhibition, and factors affecting activity.",
    difficulty: "intermediate" as const,
    status: "locked" as const,
    mastery_percentage: 0,
    path_order: 9,
    prerequisites: ["topic_004"],
    estimated_minutes: 30,
    time_spent_minutes: 0,
    questions_answered: 0,
    accuracy: 0,
  },
  {
    id: "topic_010",
    project_id: "proj_001",
    name: "Photosynthesis",
    description: "Light reactions, Calvin cycle, chloroplasts, and energy conversion.",
    difficulty: "advanced" as const,
    status: "locked" as const,
    mastery_percentage: 0,
    path_order: 10,
    prerequisites: ["topic_009"],
    estimated_minutes: 45,
    time_spent_minutes: 0,
    questions_answered: 0,
    accuracy: 0,
  },
];

// ============================================================
// SOURCE MATERIALS
// ============================================================
export const sourceMaterials = [
  {
    id: "mat_001",
    project_id: "proj_001",
    filename: "Chapter 5 - Cell Biology.pdf",
    file_type: "pdf" as const,
    file_size: "4.2 MB",
    page_count: 32,
    processing_status: "completed" as const,
    uploaded_at: daysAgo(8),
    extracted_text_preview: "Chapter 5: Cell Biology\n\nAll living organisms are composed of cells. The cell is the basic structural and functional unit of life...",
  },
  {
    id: "mat_002",
    project_id: "proj_001",
    filename: "Lecture Notes Week 3.docx",
    file_type: "docx" as const,
    file_size: "1.8 MB",
    page_count: 12,
    processing_status: "completed" as const,
    uploaded_at: daysAgo(7),
    extracted_text_preview: "Week 3 Lecture Notes — Cell Membrane & Transport\n\nThe cell membrane is a selectively permeable barrier...",
  },
  {
    id: "mat_003",
    project_id: "proj_001",
    filename: "Whiteboard Photo.png",
    file_type: "image" as const,
    file_size: "3.1 MB",
    page_count: 1,
    processing_status: "completed" as const,
    uploaded_at: daysAgo(6),
    extracted_text_preview: "DNA Replication diagram with labeled enzymes: helicase, primase, DNA polymerase III, ligase...",
  },
  {
    id: "mat_004",
    project_id: "proj_001",
    filename: "Textbook Pages 120-145.pdf",
    file_type: "pdf" as const,
    file_size: "8.7 MB",
    page_count: 26,
    processing_status: "completed" as const,
    uploaded_at: daysAgo(5),
    extracted_text_preview: "Section 6.2: Protein Synthesis\n\nThe process of protein synthesis occurs in two main stages: transcription and translation...",
  },
];

// ============================================================
// STUDY PLAN
// ============================================================
export const studyPlan = {
  project_id: "proj_001",
  total_days: 14,
  daily_target_minutes: 120,
  days: [
    { day_number: 1, date: daysAgo(5), topic_ids: ["topic_001"], session_type: "learn" as const, estimated_minutes: 90, completed: true },
    { day_number: 2, date: daysAgo(4), topic_ids: ["topic_001", "topic_002"], session_type: "learn" as const, estimated_minutes: 110, completed: true },
    { day_number: 3, date: daysAgo(3), topic_ids: ["topic_002", "topic_003"], session_type: "learn" as const, estimated_minutes: 120, completed: true },
    { day_number: 4, date: daysAgo(2), topic_ids: ["topic_003"], session_type: "review" as const, estimated_minutes: 100, completed: true },
    { day_number: 5, date: daysAgo(1), topic_ids: ["topic_003", "topic_004"], session_type: "learn" as const, estimated_minutes: 115, completed: true },
    { day_number: 6, date: today, topic_ids: ["topic_004", "topic_005"], session_type: "learn" as const, estimated_minutes: 120, completed: false },
    { day_number: 7, date: daysFromNow(1), topic_ids: ["topic_005"], session_type: "learn" as const, estimated_minutes: 110, completed: false },
    { day_number: 8, date: daysFromNow(2), topic_ids: ["topic_005", "topic_006"], session_type: "learn" as const, estimated_minutes: 120, completed: false },
    { day_number: 9, date: daysFromNow(3), topic_ids: ["topic_006"], session_type: "review" as const, estimated_minutes: 100, completed: false },
    { day_number: 10, date: daysFromNow(4), topic_ids: ["topic_007"], session_type: "learn" as const, estimated_minutes: 120, completed: false },
    { day_number: 11, date: daysFromNow(5), topic_ids: ["topic_008", "topic_009"], session_type: "learn" as const, estimated_minutes: 120, completed: false },
    { day_number: 12, date: daysFromNow(6), topic_ids: ["topic_009", "topic_010"], session_type: "learn" as const, estimated_minutes: 120, completed: false },
    { day_number: 13, date: daysFromNow(7), topic_ids: ["topic_001", "topic_002", "topic_003", "topic_004", "topic_005"], session_type: "mock_exam" as const, estimated_minutes: 60, completed: false },
    { day_number: 14, date: daysFromNow(8), topic_ids: ["topic_006", "topic_007", "topic_008", "topic_009", "topic_010"], session_type: "mock_exam" as const, estimated_minutes: 60, completed: false },
  ],
};

// ============================================================
// STUDY SESSION (active)
// ============================================================
export const activeSession = {
  id: "session_active",
  project_id: "proj_001",
  plan_day: 6,
  topic_ids: ["topic_004", "topic_005"],
  started_at: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
  elapsed_minutes: 8,
  status: "active" as const,
};

// ============================================================
// CONTENT BLOCKS
// ============================================================
export const contentBlocks = [
  {
    id: "content_001",
    topic_id: "topic_004",
    content_type: "summary" as const,
    title: "Protein Synthesis: From Gene to Protein",
    data: {
      sections: [
        {
          heading: "The Central Dogma",
          paragraphs: [
            "The central dogma of molecular biology describes the flow of genetic information: DNA → RNA → Protein. This fundamental principle explains how the instructions stored in our genes are ultimately expressed as functional proteins.",
            "The process occurs in two main stages: **transcription** (DNA to mRNA in the nucleus) and **translation** (mRNA to protein at the ribosome).",
          ],
          key_terms: [
            { term: "Central Dogma", definition: "The principle that genetic information flows from DNA to RNA to protein." },
            { term: "Transcription", definition: "The process of copying DNA into messenger RNA (mRNA)." },
            { term: "Translation", definition: "The process of reading mRNA to build a chain of amino acids (polypeptide)." },
          ],
        },
        {
          heading: "Transcription",
          paragraphs: [
            "During transcription, the enzyme **RNA polymerase** binds to a promoter region on the DNA and unwinds the double helix. It then reads the template strand (3' to 5') and synthesizes a complementary mRNA strand (5' to 3').",
            "In eukaryotes, the newly formed pre-mRNA undergoes processing: a 5' cap and 3' poly-A tail are added, and introns are spliced out, leaving only exons in the mature mRNA.",
          ],
          key_terms: [
            { term: "RNA Polymerase", definition: "The enzyme that synthesizes RNA from a DNA template." },
            { term: "Introns", definition: "Non-coding regions of pre-mRNA that are removed during splicing." },
            { term: "Exons", definition: "Coding regions of mRNA that are joined together after splicing." },
          ],
        },
        {
          heading: "Translation",
          paragraphs: [
            "Translation occurs at ribosomes in the cytoplasm. The ribosome reads the mRNA in sets of three nucleotides called **codons**. Each codon specifies a particular amino acid.",
            "Transfer RNA (tRNA) molecules carry amino acids to the ribosome. Each tRNA has an **anticodon** that pairs with a complementary mRNA codon. The ribosome catalyzes peptide bond formation between adjacent amino acids.",
          ],
          key_terms: [
            { term: "Codon", definition: "A three-nucleotide sequence on mRNA that codes for a specific amino acid." },
            { term: "Anticodon", definition: "A three-nucleotide sequence on tRNA complementary to an mRNA codon." },
            { term: "Peptide Bond", definition: "The chemical bond linking amino acids in a protein." },
          ],
        },
      ],
    },
  },
  {
    id: "content_002",
    topic_id: "topic_004",
    content_type: "micro_lesson" as const,
    title: "Protein Synthesis in 5 Bites",
    data: {
      screens: [
        {
          title: "The Blueprint",
          key_point: "DNA holds the master instructions",
          explanation: "Think of DNA as the original blueprint locked in a vault (the nucleus). You can't take the blueprint out, so you make a copy — that copy is mRNA.",
          visual_description: "A locked vault with a scroll inside, and a photocopied scroll being carried out",
        },
        {
          title: "Making the Copy",
          key_point: "Transcription = copying DNA into mRNA",
          explanation: "RNA polymerase acts like a photocopier. It reads one strand of DNA and creates a matching mRNA strand. This happens inside the nucleus.",
          visual_description: "A photocopier machine converting a blue scroll into a red scroll",
        },
        {
          title: "The Journey",
          key_point: "mRNA travels from nucleus to ribosome",
          explanation: "The mRNA copy leaves the nucleus through nuclear pores and heads to a ribosome in the cytoplasm — that's where the actual protein-building happens.",
          visual_description: "A messenger carrying a scroll through a doorway to a factory",
        },
        {
          title: "Reading the Code",
          key_point: "Codons are 3-letter words in the genetic language",
          explanation: "The ribosome reads mRNA three letters at a time. Each 3-letter 'word' (codon) tells the ribosome which amino acid to add next. AUG = start, UAA/UAG/UGA = stop.",
          visual_description: "A conveyor belt with 3-letter codes being read by a machine",
        },
        {
          title: "Building the Protein",
          key_point: "tRNA delivers amino acids one by one",
          explanation: "Each tRNA carries a specific amino acid and has an anticodon that matches an mRNA codon. The ribosome links the amino acids together like beads on a string until it hits a stop codon.",
          visual_description: "Delivery trucks (tRNA) bringing colored blocks (amino acids) to a construction site",
        },
      ],
    },
  },
  {
    id: "content_003",
    topic_id: "topic_004",
    content_type: "flashcard_deck" as const,
    title: "Protein Synthesis Flashcards",
    data: {
      cards: [
        { front: "What is the Central Dogma?", back: "DNA → RNA → Protein: the flow of genetic information in cells." },
        { front: "What enzyme carries out transcription?", back: "RNA Polymerase — it reads DNA and synthesizes mRNA." },
        { front: "What is a codon?", back: "A sequence of three nucleotides on mRNA that codes for a specific amino acid." },
        { front: "Where does translation occur?", back: "At ribosomes in the cytoplasm (or rough ER)." },
        { front: "What is the role of tRNA?", back: "tRNA carries specific amino acids to the ribosome and matches its anticodon to the mRNA codon." },
        { front: "What is the start codon?", back: "AUG — it codes for methionine and signals the start of translation." },
        { front: "What are stop codons?", back: "UAA, UAG, UGA — they signal the end of translation (no amino acid)." },
        { front: "What's the difference between introns and exons?", back: "Introns are non-coding sequences removed during splicing. Exons are coding sequences that remain in mature mRNA." },
      ],
    },
  },
  {
    id: "content_004",
    topic_id: "topic_004",
    content_type: "concept_map" as const,
    title: "Protein Synthesis Concept Map",
    data: {
      nodes: [
        { id: "n1", label: "DNA", x: 300, y: 50 },
        { id: "n2", label: "mRNA", x: 300, y: 150 },
        { id: "n3", label: "Transcription", x: 150, y: 100 },
        { id: "n4", label: "RNA Polymerase", x: 80, y: 50 },
        { id: "n5", label: "Ribosome", x: 300, y: 280 },
        { id: "n6", label: "tRNA", x: 450, y: 230 },
        { id: "n7", label: "Translation", x: 150, y: 230 },
        { id: "n8", label: "Amino Acids", x: 450, y: 330 },
        { id: "n9", label: "Protein", x: 300, y: 400 },
        { id: "n10", label: "Codons", x: 180, y: 330 },
      ],
      edges: [
        { from: "n1", to: "n2", label: "transcribed into" },
        { from: "n3", to: "n1", label: "reads" },
        { from: "n3", to: "n2", label: "produces" },
        { from: "n4", to: "n3", label: "catalyzes" },
        { from: "n2", to: "n5", label: "read by" },
        { from: "n6", to: "n5", label: "delivers to" },
        { from: "n7", to: "n5", label: "occurs at" },
        { from: "n6", to: "n8", label: "carries" },
        { from: "n8", to: "n9", label: "form" },
        { from: "n2", to: "n10", label: "composed of" },
      ],
    },
  },
  {
    id: "content_005",
    topic_id: "topic_005",
    content_type: "comparison_table" as const,
    title: "Mitosis vs Meiosis",
    data: {
      columns: ["Feature", "Mitosis", "Meiosis"],
      rows: [
        ["Purpose", "Growth & repair", "Produce gametes (sex cells)"],
        ["Divisions", "1 division", "2 divisions (meiosis I & II)"],
        ["Daughter Cells", "2 identical diploid cells", "4 unique haploid cells"],
        ["Chromosome Number", "Maintained (2n → 2n)", "Halved (2n → n)"],
        ["Crossing Over", "No", "Yes (prophase I)"],
        ["Genetic Variation", "None (clones)", "High (crossing over + independent assortment)"],
        ["Where it Occurs", "Somatic (body) cells", "Germ cells (gonads)"],
        ["Speed", "Faster", "Slower (two divisions)"],
      ],
    },
  },
  {
    id: "content_006",
    topic_id: "topic_005",
    content_type: "audio_lesson" as const,
    title: "Cell Division Audio Walkthrough",
    data: {
      duration_seconds: 480,
      duration_display: "8:00",
      transcript_preview: "Welcome to today's audio lesson on cell division. We're going to walk through the entire cell cycle, from interphase through mitosis, and then compare it with meiosis. Let's start by understanding why cells divide in the first place...",
      pause_points: [
        { time_seconds: 120, question: "What phase of the cell cycle takes the longest?" },
        { time_seconds: 300, question: "In which phase of mitosis do chromosomes line up at the cell's equator?" },
        { time_seconds: 420, question: "What is the key difference between anaphase I and anaphase II?" },
      ],
    },
  },
  {
    id: "content_007",
    topic_id: "topic_004",
    content_type: "mnemonics" as const,
    title: "Protein Synthesis Mnemonics",
    data: {
      mnemonics: [
        {
          term: "Stages of Translation",
          mnemonic: "I Eat Tacos",
          breakdown: "Initiation → Elongation → Termination",
          explanation: "The three stages of translation happen in this order: the ribosome assembles (Initiation), amino acids are added (Elongation), and a stop codon ends it (Termination).",
          emoji: "🌮",
        },
        {
          term: "DNA vs RNA bases",
          mnemonic: "U Replace T in RNA's Party",
          breakdown: "DNA has Thymine (T), RNA replaces it with Uracil (U)",
          explanation: "Both use A, G, C — but DNA pairs A-T while RNA pairs A-U. Think of U as T's fun cousin who shows up at the RNA party.",
          emoji: "🎉",
        },
        {
          term: "Codon reading direction",
          mnemonic: "mRNA reads 5' to 3', like reading left to right",
          breakdown: "5' → 3' direction for translation",
          explanation: "Just like you read English left to right, the ribosome reads mRNA from the 5' end to the 3' end.",
          emoji: "📖",
        },
        {
          term: "Central Dogma order",
          mnemonic: "Dogs Run Promptly",
          breakdown: "DNA → RNA → Protein",
          explanation: "The central dogma flows in one direction: DNA is transcribed to RNA, which is translated to Protein.",
          emoji: "🐕",
        },
        {
          term: "Start and Stop codons",
          mnemonic: "AUG Starts the engine, U-A-A U-A-G U-G-A Stop the car",
          breakdown: "Start: AUG (Methionine) | Stop: UAA, UAG, UGA",
          explanation: "There's only one start codon (AUG) but three stop codons. Remember: U Always Appears in stop codons.",
          emoji: "🚗",
        },
      ],
    },
  },
];

// ============================================================
// QUIZ QUESTIONS
// ============================================================
export const quizQuestions = [
  {
    id: "q_001",
    topic_id: "topic_004",
    type: "multiple_choice" as const,
    difficulty: "foundational" as const,
    question_text: "Which enzyme is responsible for transcription?",
    options: ["DNA Polymerase", "RNA Polymerase", "Helicase", "Ligase"],
    correct_answer: "RNA Polymerase",
    explanation: "RNA Polymerase reads the DNA template strand and synthesizes a complementary mRNA molecule during transcription.",
    hint_layers: [
      "Think about which type of nucleic acid is being produced during transcription.",
      "The enzyme is named after the product it creates — it makes RNA.",
      "RNA Polymerase binds to the promoter region and builds mRNA from 5' to 3'.",
    ],
  },
  {
    id: "q_002",
    topic_id: "topic_004",
    type: "multiple_choice" as const,
    difficulty: "intermediate" as const,
    question_text: "What is the start codon, and which amino acid does it code for?",
    options: ["UAA — Leucine", "AUG — Methionine", "UGA — Tryptophan", "GCA — Alanine"],
    correct_answer: "AUG — Methionine",
    explanation: "AUG is the universal start codon. It codes for methionine (Met) and signals the ribosome to begin translation.",
    hint_layers: [
      "The start codon is always the same three letters.",
      "It starts with 'A' and the amino acid starts with 'M'.",
      "AUG codes for Methionine and is the initiation codon for all protein synthesis.",
    ],
  },
  {
    id: "q_003",
    topic_id: "topic_004",
    type: "multiple_choice" as const,
    difficulty: "intermediate" as const,
    question_text: "In eukaryotic mRNA processing, introns are:",
    options: [
      "Coding regions that stay in the mRNA",
      "Non-coding regions that are spliced out",
      "Protective caps added to the 5' end",
      "Poly-A tails added to the 3' end",
    ],
    correct_answer: "Non-coding regions that are spliced out",
    explanation: "Introns are intervening, non-coding sequences in pre-mRNA. During RNA processing, they are removed (spliced out), and the remaining exons are joined together to form mature mRNA.",
    hint_layers: [
      "Think about what 'intron' sounds like — 'in' as in 'intervening'.",
      "They interrupt the coding sequence and need to be removed.",
      "Introns = intervening sequences (removed). Exons = expressed sequences (kept).",
    ],
  },
  {
    id: "q_004",
    topic_id: "topic_004",
    type: "multiple_choice" as const,
    difficulty: "foundational" as const,
    question_text: "Where does translation take place in a eukaryotic cell?",
    options: ["Nucleus", "Mitochondria", "Ribosome in the cytoplasm", "Smooth ER"],
    correct_answer: "Ribosome in the cytoplasm",
    explanation: "Translation occurs at ribosomes, which can be free-floating in the cytoplasm or attached to the rough endoplasmic reticulum.",
    hint_layers: [
      "Translation needs access to amino acids and tRNA, which are in the cytoplasm.",
      "The large molecular machine where mRNA is read starts with 'R'.",
      "Ribosomes in the cytoplasm (or on rough ER) are where mRNA is translated into protein.",
    ],
  },
  {
    id: "q_005",
    topic_id: "topic_005",
    type: "multiple_choice" as const,
    difficulty: "intermediate" as const,
    question_text: "How many daughter cells are produced at the end of meiosis?",
    options: ["1", "2", "4", "8"],
    correct_answer: "4",
    explanation: "Meiosis involves two rounds of cell division (meiosis I and meiosis II), resulting in four genetically unique haploid daughter cells.",
    hint_layers: [
      "Meiosis has two divisions, not just one.",
      "After meiosis I: 2 cells. After meiosis II: each of those divides again.",
      "2 × 2 = 4 haploid daughter cells, each genetically unique.",
    ],
  },
  {
    id: "q_006",
    topic_id: "topic_005",
    type: "true_false" as const,
    difficulty: "foundational" as const,
    question_text: "Mitosis produces genetically identical daughter cells.",
    options: ["True", "False"],
    correct_answer: "True",
    explanation: "Mitosis produces two genetically identical diploid daughter cells. The DNA is replicated and divided equally, maintaining the same chromosome number and genetic information.",
    hint_layers: [
      "Think about the purpose of mitosis — growth and repair need consistent copies.",
      "Unlike meiosis, there's no crossing over or independent assortment in mitosis.",
      "Mitosis = identical copies. The daughter cells are clones of the parent cell.",
    ],
  },
  {
    id: "q_007",
    topic_id: "topic_005",
    type: "true_false" as const,
    difficulty: "intermediate" as const,
    question_text: "Crossing over occurs during prophase II of meiosis.",
    options: ["True", "False"],
    correct_answer: "False",
    explanation: "Crossing over occurs during prophase I, not prophase II. During prophase I, homologous chromosomes pair up (synapsis) and exchange genetic material at points called chiasmata.",
    hint_layers: [
      "Crossing over involves homologous chromosome pairs — which division deals with homologs?",
      "Homologous pairs are separated in meiosis I, so crossing over must happen before that.",
      "Crossing over = prophase I. By prophase II, homologs are already separated.",
    ],
  },
  {
    id: "q_008",
    topic_id: "topic_004",
    type: "fill_blank" as const,
    difficulty: "foundational" as const,
    question_text: "The process of copying DNA into mRNA is called ___.",
    options: [],
    correct_answer: "transcription",
    explanation: "Transcription is the first step of gene expression, where a segment of DNA is copied into mRNA by RNA polymerase.",
    hint_layers: [
      "It's similar to transcribing notes — copying information from one form to another.",
      "It starts with 'trans-' meaning 'across' — information transfers across molecule types.",
      "Transcription: DNA → mRNA. Translation: mRNA → Protein.",
    ],
  },
  {
    id: "q_009",
    topic_id: "topic_004",
    type: "fill_blank" as const,
    difficulty: "intermediate" as const,
    question_text: "A three-nucleotide sequence on mRNA that codes for a specific amino acid is called a ___.",
    options: [],
    correct_answer: "codon",
    explanation: "A codon is a sequence of three consecutive nucleotides on mRNA. Each codon specifies a particular amino acid (or a stop signal) during translation.",
    hint_layers: [
      "It's a short word that sounds like 'code' + 'on'.",
      "The complementary sequence on tRNA is called an anti-___.",
      "Codon (mRNA) pairs with anticodon (tRNA) to specify amino acids.",
    ],
  },
  {
    id: "q_010",
    topic_id: "topic_005",
    type: "fill_blank" as const,
    difficulty: "foundational" as const,
    question_text: "The phase of the cell cycle where DNA replication occurs is called the ___ phase.",
    options: [],
    correct_answer: "S",
    explanation: "The S (synthesis) phase is when DNA replication occurs. It's part of interphase, occurring between G1 and G2 phases.",
    hint_layers: [
      "It stands for 'Synthesis' — what's being synthesized is new DNA.",
      "The letter comes between G1 and G2 in the cell cycle.",
      "G1 → S (synthesis/DNA replication) → G2 → M (mitosis).",
    ],
  },
  {
    id: "q_011",
    topic_id: "topic_004",
    type: "short_answer" as const,
    difficulty: "advanced" as const,
    question_text: "Explain the difference between transcription and translation in one or two sentences.",
    options: [],
    correct_answer: "Transcription is the process of copying DNA into mRNA in the nucleus. Translation is the process of reading mRNA to build a protein at the ribosome.",
    explanation: "These are the two main steps of gene expression. Transcription copies the genetic code (DNA → mRNA), while translation decodes it to build proteins (mRNA → protein).",
    hint_layers: [
      "Think about what each word means literally: 'transcribe' vs 'translate'.",
      "One happens in the nucleus (makes RNA), the other at the ribosome (makes protein).",
      "Transcription = DNA → mRNA (nucleus). Translation = mRNA → Protein (ribosome).",
    ],
  },
  {
    id: "q_012",
    topic_id: "topic_005",
    type: "short_answer" as const,
    difficulty: "advanced" as const,
    question_text: "Why is meiosis important for genetic diversity? Give two reasons.",
    options: [],
    correct_answer: "Meiosis generates genetic diversity through crossing over (exchange of genetic material between homologous chromosomes) and independent assortment (random orientation of chromosome pairs during division).",
    explanation: "Crossing over creates new combinations of alleles on chromosomes, while independent assortment randomly distributes maternal and paternal chromosomes to gametes. Together, these ensure each gamete is genetically unique.",
    hint_layers: [
      "Think about what happens during prophase I and metaphase I specifically.",
      "One involves physical exchange of DNA segments, the other involves random chromosome alignment.",
      "Crossing over (prophase I) + Independent assortment (metaphase I) = genetic diversity.",
    ],
  },
];

// ============================================================
// QUIZ ATTEMPTS (history)
// ============================================================
export const quizAttempts = [
  { id: "att_01", question_id: "q_001", correct: true, time_taken: 12, hints_used: 0, rephrasing_needed: false, date: daysAgo(5) },
  { id: "att_02", question_id: "q_002", correct: false, time_taken: 25, hints_used: 1, rephrasing_needed: true, date: daysAgo(5) },
  { id: "att_03", question_id: "q_003", correct: true, time_taken: 18, hints_used: 0, rephrasing_needed: false, date: daysAgo(5) },
  { id: "att_04", question_id: "q_004", correct: true, time_taken: 8, hints_used: 0, rephrasing_needed: false, date: daysAgo(4) },
  { id: "att_05", question_id: "q_005", correct: false, time_taken: 30, hints_used: 2, rephrasing_needed: true, date: daysAgo(4) },
  { id: "att_06", question_id: "q_006", correct: true, time_taken: 5, hints_used: 0, rephrasing_needed: false, date: daysAgo(4) },
  { id: "att_07", question_id: "q_007", correct: false, time_taken: 15, hints_used: 1, rephrasing_needed: false, date: daysAgo(3) },
  { id: "att_08", question_id: "q_008", correct: true, time_taken: 10, hints_used: 0, rephrasing_needed: false, date: daysAgo(3) },
  { id: "att_09", question_id: "q_001", correct: true, time_taken: 7, hints_used: 0, rephrasing_needed: false, date: daysAgo(3) },
  { id: "att_10", question_id: "q_002", correct: true, time_taken: 14, hints_used: 0, rephrasing_needed: false, date: daysAgo(2) },
  { id: "att_11", question_id: "q_009", correct: false, time_taken: 22, hints_used: 1, rephrasing_needed: true, date: daysAgo(2) },
  { id: "att_12", question_id: "q_010", correct: true, time_taken: 9, hints_used: 0, rephrasing_needed: false, date: daysAgo(2) },
  { id: "att_13", question_id: "q_003", correct: true, time_taken: 11, hints_used: 0, rephrasing_needed: false, date: daysAgo(2) },
  { id: "att_14", question_id: "q_005", correct: true, time_taken: 16, hints_used: 0, rephrasing_needed: false, date: daysAgo(1) },
  { id: "att_15", question_id: "q_011", correct: false, time_taken: 45, hints_used: 2, rephrasing_needed: true, date: daysAgo(1) },
  { id: "att_16", question_id: "q_006", correct: true, time_taken: 4, hints_used: 0, rephrasing_needed: false, date: daysAgo(1) },
  { id: "att_17", question_id: "q_007", correct: true, time_taken: 12, hints_used: 1, rephrasing_needed: false, date: daysAgo(1) },
  { id: "att_18", question_id: "q_004", correct: true, time_taken: 6, hints_used: 0, rephrasing_needed: false, date: daysAgo(0) },
  { id: "att_19", question_id: "q_008", correct: true, time_taken: 8, hints_used: 0, rephrasing_needed: false, date: daysAgo(0) },
  { id: "att_20", question_id: "q_012", correct: false, time_taken: 55, hints_used: 3, rephrasing_needed: true, date: daysAgo(0) },
  { id: "att_21", question_id: "q_009", correct: true, time_taken: 13, hints_used: 0, rephrasing_needed: false, date: daysAgo(0) },
  { id: "att_22", question_id: "q_010", correct: true, time_taken: 7, hints_used: 0, rephrasing_needed: false, date: daysAgo(0) },
  { id: "att_23", question_id: "q_001", correct: true, time_taken: 5, hints_used: 0, rephrasing_needed: false, date: daysAgo(0) },
  { id: "att_24", question_id: "q_011", correct: true, time_taken: 28, hints_used: 1, rephrasing_needed: false, date: daysAgo(0) },
  { id: "att_25", question_id: "q_003", correct: false, time_taken: 20, hints_used: 0, rephrasing_needed: false, date: daysAgo(0) },
];

// ============================================================
// SPACED REPETITION CARDS
// ============================================================
export const spacedRepetitionCards = [
  { id: "sr_001", question_id: "q_001", easiness_factor: 2.5, interval_days: 6, repetitions: 3, next_review_date: today, last_reviewed: daysAgo(6) },
  { id: "sr_002", question_id: "q_002", easiness_factor: 2.1, interval_days: 3, next_review_date: today, repetitions: 2, last_reviewed: daysAgo(3) },
  { id: "sr_003", question_id: "q_003", easiness_factor: 2.6, interval_days: 10, next_review_date: daysFromNow(4), repetitions: 4, last_reviewed: daysAgo(6) },
  { id: "sr_004", question_id: "q_004", easiness_factor: 2.8, interval_days: 14, next_review_date: daysFromNow(8), repetitions: 5, last_reviewed: daysAgo(6) },
  { id: "sr_005", question_id: "q_006", easiness_factor: 2.5, interval_days: 1, next_review_date: today, repetitions: 1, last_reviewed: daysAgo(1) },
  { id: "sr_006", question_id: "q_007", easiness_factor: 1.8, interval_days: 1, next_review_date: today, repetitions: 1, last_reviewed: daysAgo(1) },
  { id: "sr_007", question_id: "q_008", easiness_factor: 2.3, interval_days: 4, next_review_date: daysFromNow(2), repetitions: 3, last_reviewed: daysAgo(2) },
  { id: "sr_008", question_id: "q_009", easiness_factor: 2.0, interval_days: 2, next_review_date: today, repetitions: 2, last_reviewed: daysAgo(2) },
  { id: "sr_009", question_id: "q_010", easiness_factor: 2.4, interval_days: 5, next_review_date: daysFromNow(3), repetitions: 3, last_reviewed: daysAgo(2) },
  { id: "sr_010", question_id: "q_011", easiness_factor: 1.6, interval_days: 1, next_review_date: today, repetitions: 1, last_reviewed: daysAgo(1) },
];

// ============================================================
// ACHIEVEMENTS
// ============================================================
export const achievements = [
  { id: "ach_001", type: "milestone", name: "First Steps", description: "Complete your first study session", icon_name: "Footprints", xp_award: 25, earned: true, earned_at: daysAgo(5) },
  { id: "ach_002", type: "streak", name: "Three's Company", description: "Maintain a 3-day study streak", icon_name: "Flame", xp_award: 50, earned: true, earned_at: daysAgo(3) },
  { id: "ach_003", type: "streak", name: "Week Warrior", description: "Maintain a 7-day study streak", icon_name: "Flame", xp_award: 100, earned: true, earned_at: daysAgo(0) },
  { id: "ach_004", type: "mastery", name: "Topic Master", description: "Master your first topic", icon_name: "Crown", xp_award: 75, earned: true, earned_at: daysAgo(3) },
  { id: "ach_005", type: "quiz", name: "Perfect Score", description: "Get 100% on a quiz checkpoint", icon_name: "Star", xp_award: 50, earned: true, earned_at: daysAgo(4) },
  { id: "ach_006", type: "study", name: "Bookworm", description: "Study for 10 total hours", icon_name: "BookOpen", xp_award: 75, earned: true, earned_at: daysAgo(2) },
  { id: "ach_007", type: "quiz", name: "Quick Draw", description: "Answer 5 questions in under 10 seconds each", icon_name: "Zap", xp_award: 50, earned: true, earned_at: daysAgo(1) },
  { id: "ach_008", type: "streak", name: "Month of Mastery", description: "Maintain a 30-day study streak", icon_name: "Calendar", xp_award: 250, earned: false, earned_at: null },
  { id: "ach_009", type: "study", name: "Marathon Runner", description: "Study for 3+ hours in a single day", icon_name: "Timer", xp_award: 100, earned: false, earned_at: null },
  { id: "ach_010", type: "study", name: "Night Owl", description: "Complete a study session after 11 PM", icon_name: "Moon", xp_award: 50, earned: false, earned_at: null },
  { id: "ach_011", type: "quiz", name: "Speed Demon", description: "Complete a full quiz in under 2 minutes", icon_name: "Rocket", xp_award: 75, earned: false, earned_at: null },
  { id: "ach_012", type: "streak", name: "The Comeback", description: "Resume studying after 3+ days off", icon_name: "RotateCcw", xp_award: 50, earned: false, earned_at: null },
  { id: "ach_013", type: "mastery", name: "Half Way There", description: "Master 50% of topics in a project", icon_name: "Award", xp_award: 150, earned: false, earned_at: null },
  { id: "ach_014", type: "mastery", name: "Brain Full", description: "Master all topics in a project", icon_name: "GraduationCap", xp_award: 500, earned: false, earned_at: null },
  { id: "ach_015", type: "study", name: "Early Bird", description: "Complete a study session before 8 AM", icon_name: "Sunrise", xp_award: 50, earned: false, earned_at: null },
];

// ============================================================
// NOTIFICATIONS
// ============================================================
export const notifications = [
  {
    id: "notif_001",
    type: "spaced_review" as const,
    title: "Reviews due!",
    body: "You have 6 flashcards due for review. Keep those memories fresh!",
    sent_at: new Date(todayDate.getTime() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: "notif_002",
    type: "daily_reminder" as const,
    title: "Time to study!",
    body: "Day 6 of your Biology 101 plan. Today: Protein Synthesis & Cell Division.",
    sent_at: new Date(todayDate.getTime() - 4 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: "notif_003",
    type: "streak_warning" as const,
    title: "Don't break your streak! 🔥",
    body: "You're on a 7-day streak. Study today to keep it alive!",
    sent_at: new Date(todayDate.getTime() - 6 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: "notif_004",
    type: "milestone" as const,
    title: "Achievement Unlocked! 🏆",
    body: "Week Warrior — You maintained a 7-day study streak!",
    sent_at: daysAgo(0),
    read: true,
  },
  {
    id: "notif_005",
    type: "spaced_review" as const,
    title: "Quick review?",
    body: "3 cards from Cell Membrane are due. Takes just 2 minutes.",
    sent_at: daysAgo(1),
    read: true,
  },
  {
    id: "notif_006",
    type: "milestone" as const,
    title: "New topic mastered! 🌟",
    body: "You've mastered DNA & RNA. That's 3 out of 10 topics!",
    sent_at: daysAgo(2),
    read: true,
  },
];

// ============================================================
// WELLBEING CHECK-IN
// ============================================================
export const wellbeingCheckin = {
  mood: "okay" as const,
  energy: "medium" as const,
};

// ============================================================
// SESSION HISTORY
// ============================================================
export const sessionHistory = [
  { id: "sh_01", project_id: "proj_001", project_name: "Biology 101 Final", date: daysAgo(0), duration_minutes: 8, topics: ["Protein Synthesis"], xp_earned: 35, accuracy: 75, completed: false },
  { id: "sh_02", project_id: "proj_001", project_name: "Biology 101 Final", date: daysAgo(1), duration_minutes: 115, topics: ["DNA & RNA", "Protein Synthesis"], xp_earned: 145, accuracy: 72, completed: true },
  { id: "sh_03", project_id: "proj_002", project_name: "Organic Chemistry Midterm", date: daysAgo(1), duration_minutes: 90, topics: ["Alkanes", "Alkenes"], xp_earned: 120, accuracy: 68, completed: true },
  { id: "sh_04", project_id: "proj_001", project_name: "Biology 101 Final", date: daysAgo(2), duration_minutes: 100, topics: ["DNA & RNA"], xp_earned: 110, accuracy: 78, completed: true },
  { id: "sh_05", project_id: "proj_002", project_name: "Organic Chemistry Midterm", date: daysAgo(2), duration_minutes: 95, topics: ["Functional Groups"], xp_earned: 105, accuracy: 62, completed: true },
  { id: "sh_06", project_id: "proj_003", project_name: "History of Art Essay", date: daysAgo(2), duration_minutes: 60, topics: ["Renaissance Art"], xp_earned: 80, accuracy: 58, completed: true },
  { id: "sh_07", project_id: "proj_001", project_name: "Biology 101 Final", date: daysAgo(3), duration_minutes: 120, topics: ["Cell Membrane", "DNA & RNA"], xp_earned: 155, accuracy: 80, completed: true },
  { id: "sh_08", project_id: "proj_002", project_name: "Organic Chemistry Midterm", date: daysAgo(3), duration_minutes: 85, topics: ["Stereochemistry"], xp_earned: 95, accuracy: 55, completed: true },
  { id: "sh_09", project_id: "proj_001", project_name: "Biology 101 Final", date: daysAgo(4), duration_minutes: 110, topics: ["Cell Structure", "Cell Membrane"], xp_earned: 140, accuracy: 85, completed: true },
  { id: "sh_10", project_id: "proj_002", project_name: "Organic Chemistry Midterm", date: daysAgo(4), duration_minutes: 100, topics: ["Bonding", "Hybridization"], xp_earned: 130, accuracy: 70, completed: true },
  { id: "sh_11", project_id: "proj_001", project_name: "Biology 101 Final", date: daysAgo(5), duration_minutes: 90, topics: ["Cell Structure"], xp_earned: 125, accuracy: 88, completed: true },
  { id: "sh_12", project_id: "proj_003", project_name: "History of Art Essay", date: daysAgo(5), duration_minutes: 55, topics: ["Baroque Period"], xp_earned: 70, accuracy: 60, completed: true },
  { id: "sh_13", project_id: "proj_002", project_name: "Organic Chemistry Midterm", date: daysAgo(6), duration_minutes: 110, topics: ["Nomenclature"], xp_earned: 115, accuracy: 65, completed: true },
  { id: "sh_14", project_id: "proj_002", project_name: "Organic Chemistry Midterm", date: daysAgo(7), duration_minutes: 95, topics: ["Atomic Structure"], xp_earned: 100, accuracy: 72, completed: true },
  { id: "sh_15", project_id: "proj_003", project_name: "History of Art Essay", date: daysAgo(8), duration_minutes: 65, topics: ["Impressionism"], xp_earned: 85, accuracy: 55, completed: true },
  { id: "sh_16", project_id: "proj_002", project_name: "Organic Chemistry Midterm", date: daysAgo(9), duration_minutes: 120, topics: ["Reactions Intro"], xp_earned: 140, accuracy: 60, completed: true },
  { id: "sh_17", project_id: "proj_002", project_name: "Organic Chemistry Midterm", date: daysAgo(10), duration_minutes: 80, topics: ["Lewis Structures"], xp_earned: 90, accuracy: 75, completed: true },
  { id: "sh_18", project_id: "proj_002", project_name: "Organic Chemistry Midterm", date: daysAgo(12), duration_minutes: 105, topics: ["Periodic Trends"], xp_earned: 110, accuracy: 68, completed: true },
];

// ============================================================
// MOCK EXAM
// ============================================================
export const mockExam = {
  id: "exam_001",
  project_id: "proj_001",
  title: "Biology 101 Mock Exam",
  total_questions: 25,
  time_allowed_minutes: 60,
  time_taken_minutes: 48,
  score_percentage: 72,
  grade: "B-",
  completed: true,
  completed_at: daysAgo(0),
  topic_breakdown: [
    { topic_id: "topic_001", topic_name: "Cell Structure", correct: 4, total: 4, percentage: 100 },
    { topic_id: "topic_002", topic_name: "Cell Membrane", correct: 3, total: 4, percentage: 75 },
    { topic_id: "topic_003", topic_name: "DNA & RNA", correct: 3, total: 4, percentage: 75 },
    { topic_id: "topic_004", topic_name: "Protein Synthesis", correct: 2, total: 4, percentage: 50 },
    { topic_id: "topic_005", topic_name: "Cell Division", correct: 2, total: 4, percentage: 50 },
    { topic_id: "topic_006", topic_name: "Genetics", correct: 2, total: 3, percentage: 67 },
    { topic_id: "topic_007", topic_name: "Evolution", correct: 2, total: 2, percentage: 100 },
  ],
  questions: quizQuestions.slice(0, 12).map((q, i) => ({
    ...q,
    user_answer: i % 4 === 1 ? q.options?.[0] || "Wrong answer" : q.correct_answer,
    is_correct: i % 4 !== 1,
    flagged: i === 3 || i === 7,
  })),
};

// ============================================================
// STUDY WRAPPED
// ============================================================
export const studyWrapped = {
  project_id: "proj_001",
  project_name: "Biology 101 Final",
  total_hours: 26,
  total_sessions: 18,
  topics_mastered: 6,
  questions_answered: 187,
  longest_streak: 12,
  personality: "Night Owl — you peak at 11pm",
  personality_icon: "Moon",
  strongest_topic: "Cell Structure",
  strongest_mastery: 98,
  most_improved: "Genetics",
  most_improved_before: 12,
  most_improved_after: 78,
  final_readiness: 78,
  calendar_data: Array.from({ length: 14 }, (_, i) => ({
    date: daysAgo(13 - i),
    minutes: Math.floor(Math.random() * 120) + 30,
    studied: i !== 8,
  })),
};

// ============================================================
// BOOKMARKS
// ============================================================
export const bookmarks = [
  { id: "bm_001", topic_name: "Protein Synthesis", content_type: "summary" as const, content_id: "content_001", preview: "The Central Dogma: DNA → RNA → Protein", saved_at: daysAgo(2) },
  { id: "bm_002", topic_name: "Protein Synthesis", content_type: "flashcard" as const, content_id: "content_003", preview: "What is the start codon? → AUG — Methionine", saved_at: daysAgo(3) },
  { id: "bm_003", topic_name: "Cell Division", content_type: "comparison_table" as const, content_id: "content_005", preview: "Mitosis vs Meiosis comparison", saved_at: daysAgo(1) },
  { id: "bm_004", topic_name: "DNA & RNA", content_type: "summary" as const, content_id: "content_001", preview: "Base pairing rules: A-T, G-C in DNA; A-U, G-C in RNA", saved_at: daysAgo(4) },
  { id: "bm_005", topic_name: "Cell Membrane", content_type: "micro_lesson" as const, content_id: "content_002", preview: "Active vs Passive Transport", saved_at: daysAgo(5) },
  { id: "bm_006", topic_name: "Cell Structure", content_type: "flashcard" as const, content_id: "content_003", preview: "What organelle is the 'powerhouse of the cell'?", saved_at: daysAgo(6) },
];

// ============================================================
// SESSION NOTES
// ============================================================
export const sessionNotes = [
  { id: "note_001", topic_id: "topic_004", topic_name: "Protein Synthesis", text: "Remember: transcription happens in the NUCLEUS, translation happens in the CYTOPLASM. Easy to mix these up!", timestamp: daysAgo(1) + "T19:34:00Z" },
  { id: "note_002", topic_id: "topic_003", topic_name: "DNA & RNA", text: "DNA = deoxyribose sugar, RNA = ribose sugar. RNA has uracil instead of thymine. Also RNA is usually single-stranded.", timestamp: daysAgo(3) + "T20:12:00Z" },
  { id: "note_003", topic_id: "topic_005", topic_name: "Cell Division", text: "PMAT for mitosis phases: Prophase, Metaphase, Anaphase, Telophase. For meiosis, same thing but twice (PMAT I and PMAT II).", timestamp: daysAgo(0) + "T18:45:00Z" },
  { id: "note_004", topic_id: "topic_001", topic_name: "Cell Structure", text: "Rough ER has ribosomes (protein synthesis), Smooth ER doesn't (lipid synthesis, detox). Golgi packages and ships proteins.", timestamp: daysAgo(5) + "T21:08:00Z" },
];

// ============================================================
// KNOWLEDGE GRAPH DATA
// ============================================================
export const knowledgeGraph = {
  nodes: topics.map((t, i) => ({
    id: t.id,
    label: t.name,
    x: 150 + (i % 3) * 200 + (Math.random() * 40 - 20),
    y: 80 + Math.floor(i / 3) * 160 + (Math.random() * 30 - 15),
    mastery: t.mastery_percentage,
    difficulty: t.difficulty,
    status: t.status,
    estimated_minutes: t.estimated_minutes,
  })),
  edges: [
    { from: "topic_001", to: "topic_002", type: "prerequisite" as const },
    { from: "topic_001", to: "topic_003", type: "prerequisite" as const },
    { from: "topic_003", to: "topic_004", type: "prerequisite" as const },
    { from: "topic_003", to: "topic_005", type: "prerequisite" as const },
    { from: "topic_005", to: "topic_006", type: "prerequisite" as const },
    { from: "topic_006", to: "topic_007", type: "prerequisite" as const },
    { from: "topic_007", to: "topic_008", type: "prerequisite" as const },
    { from: "topic_004", to: "topic_009", type: "prerequisite" as const },
    { from: "topic_009", to: "topic_010", type: "prerequisite" as const },
    { from: "topic_002", to: "topic_009", type: "related" as const },
    { from: "topic_004", to: "topic_006", type: "related" as const },
    { from: "topic_005", to: "topic_007", type: "related" as const },
    { from: "topic_001", to: "topic_008", type: "related" as const },
  ],
};
