import { Injectable } from '@angular/core';

interface EmtTopic {
  name: string;
  description: string;
  context: string;
}

@Injectable({ providedIn: 'root' })
export class EmtDataService {
  private emtData: EmtTopic[] = [
    {
      name: 'Airway Management',
      description: 'Covers techniques for maintaining a patent airway.',
      context: `
        Airway management is essential for unconscious patients. Assessment uses the AVPU scale (Alert, Verbal, Painful, Unresponsive). For patients responsive to verbal commands or painful stimulus, or who are unresponsive, an airway intervention may be needed.
        The steps are Open, Clear, and Maintain.
        1. Open: Use the Head-Tilt, Chin-Lift for non-trauma patients or the Jaw Thrust for suspected trauma.
        2. Clear: Suctioning removes vomitus, blood, or secretions. Suction pressure and duration vary by age: Adult (100-120mmHg, 15s), Child (80-100mmHg, 10s), Infant (60mmHg, 5s).
        3. Maintain: Use airway adjuncts. Oropharyngeal airways (OPAs) are for unresponsive patients without a gag reflex. Nasopharyngeal airways (NPAs) are for patients with a gag reflex but no suspected basal skull fracture.
        Ventilation is provided via a Bag-Valve-Mask (BVM) for inadequate breathing (<10 or >30 breaths/min) or apnea. Oxygen can be administered via Nasal Cannula (1-6 L/min, 24-44% O2), Simple Face Mask (6-10 L/min, 35-60% O2), or Non-Rebreather Mask (10-15 L/min, up to 90% O2).
      `
    },
    {
      name: 'Patient Assessment',
      description: 'Systematic approach to evaluating a patient\'s condition.',
      context: `
        Patient assessment includes scene size-up, primary survey (Initial Assessment), and secondary survey. The primary survey follows GRC-ABC: General Impression, Response (AVPU), Circulation, Airway, Breathing.
        Key acronyms are SAMPLE (Signs/Symptoms, Allergies, Medications, Past history, Last oral intake, Events) and OPQRST for pain (Onset, Provocation, Quality, Radiation, Severity, Time).
        Vital Signs Normal Ranges:
        - Respiration: Adult (12-20), Child (15-30), Infant (25-50), Newborn (40-60 breaths/min).
        - Pulse: Adult (60-100), Child (80-120), Infant (100-150), Newborn (120-160 beats/min).
        - Blood Pressure (Systolic): >10yrs (100-140mmHg), 1-10yrs (70 + [Age*2]), <1yr (>60mmHg).
        - SpO2: Normal >95%. Mild Hypoxia (91-94%), Moderate (86-90%), Severe (<85%).
        - Blood Sugar: Adult (70-140 mg/dl), Child/Infant (60-140 mg/dl).
        - Pupils: Should be equal and reactive to light (PERL). Constricted pupils can indicate opiate use; dilated pupils can indicate atropine or head injury.
      `
    },
    {
      name: 'Bleeding Control',
      description: 'Methods to control external hemorrhage.',
      context: `
        The primary method for controlling external bleeding is direct pressure with a sterile dressing. If direct pressure is not effective on an extremity, apply a tourniquet proximal to the wound and note the time. For major trauma with severe bleeding, administration of Tranexamic Acid (TXA) may be indicated to prevent blood clot breakdown. Shock management includes keeping the patient warm, providing oxygen, and considering fluid resuscitation.
      `
    },
    {
      name: 'Cardiac Emergencies',
      description: 'Assessment and management of acute cardiac conditions like Angina and Myocardial Infarction.',
      context: `
        Chest pain (Angina) is a primary symptom of inadequate blood supply to the heart muscle. Causes include Myocardial Infarction (MI), Pulmonary Embolism, and Aortic Dissection. Risk factors include age, family history, hypertension, smoking, and diabetes.
        Signs and symptoms include squeezing chest discomfort, radiation to the arms/jaw/neck, dyspnea, nausea, and diaphoresis (heavy sweating).
        Assessment uses OPQRST. Pre-hospital protocol for a suspected MI may include a loading dose of antiplatelet and anticoagulant medications:
        - Aspirin 300mg (Antiplatelet)
        - Clopidogrel 300mg (Anti-coagulant)
        - Atorvastatin 80mg (Antihyperlipidemic)
      `
    },
    {
      name: 'Cardio Pulmonary Resuscitation',
      description: 'Covers basic and advanced life support techniques for cardiac arrest.',
      context: `CPR is a life-saving procedure performed when someone's breathing or heartbeat has stopped. It involves chest compressions and rescue breaths. Key steps include checking responsiveness, calling for help, chest compressions at a rate of 100-120 per minute, airway management, and breathing. Automated External Defibrillators (AEDs) are crucial for analyzing heart rhythm and delivering a shock if needed.`
    },
    {
      name: 'Medical Complications in Pregnancy',
      description: 'Details common and critical complications during pregnancy.',
      context: `
        Danger signs include vaginal bleeding, abdominal pain, persistent vomiting, severe headaches, and blurred vision.
        - Antepartum Hemorrhage: Placenta Previa (painless bleeding) vs. Abruptio Placentae (painful bleeding, knife-like pain).
        - Hypertensive Disorders: Pre-Eclampsia (hypertension >140/90 after 24 weeks) and Eclampsia (same, with seizures). Management includes O2, left lateral position, and managing seizures.
        - Supine Hypotensive Syndrome: The uterus compresses the inferior vena cava in the supine position. Place patient in left lateral position.
        - Ectopic Pregnancy: Pregnancy outside the uterus, causing severe abdominal pain. Treat for shock.
        - Gestational Diabetes: Can cause hypoglycemia or hyperglycemia. Manage blood sugar as needed.
      `
    },
    {
      name: 'Musculoskeletal & Soft Tissue Injuries',
      description: 'Covers assessment and initial management of common injuries like sprains, strains, fractures, and soft tissue damage.',
      context: `
        Assessment uses DCAP-BTLS and TIC (Tenderness, Instability, Crepitus). Management includes immobilization, ice, and elevation.
        - Sprain: Tearing of ligaments. Causes pain, edema, and joint instability.
        - Strain: Stretching or tearing of a muscle.
        - Dislocation: Disruption of a joint. Causes marked deformity and loss of function.
        - Fracture: A break in the bone. Can be closed (skin intact) or open (skin broken).
        - Soft Tissue Injuries: Include contusions (bruise), hematomas (blood under skin), abrasions (scrape), lacerations (cut), punctures, and avulsions (skin torn as a flap).
      `
    },
    {
      name: 'Triage Principles (CTAS)',
      description: 'Understanding the Canadian Triage and Acuity Scale for prioritizing patients.',
      context: `Pre-hospital triage sorts patients by urgency.
        - RED (Critical - Resuscitation/Very Urgent): Life-threatening conditions. GCS < 10, Pulse <60 or >110, RR <10 or >30, Systolic BP <100, SpO2 < 90%. Includes conditions like active seizure, severe PPH, eclampsia, major trauma.
        - YELLOW (Urgent): Serious conditions needing prompt care. GCS 10-12, Pulse 100-110, RR 21-30, SpO2 91-94%. Includes conditions like stroke after 4.5 hours, moderate allergic reactions, moderate dehydration.
        - GREEN (Non-Critical - Less/Non Urgent): Stable conditions. GCS 13-15, normal vital signs. Includes minor injuries, mild allergic reactions.
      `
    },
    {
      name: 'Postpartum Hemorrhage (PPH)',
      description: 'Management of excessive bleeding following childbirth.',
      context: `PPH is blood loss >500ml after delivery. Causes are the 4 T's: Tone (uterine atony is most common), Tissue (retained placenta), Trauma (lacerations), and Thrombin (bleeding disorders). Management includes high-flow O2, uterine massage, administering Oxytocin, establishing IV access, and rapid transport. The Non-Pneumatic Anti-Shock Garment (NASG) can be used to decrease hemorrhage and resuscitate central circulating volume.`
    },
    {
      name: 'Labor & Delivery',
      description: 'Assisting with childbirth in a pre-hospital setting.',
      context: `Labor has 3 stages: 1st (Dilatation), 2nd (Expulsion of baby), 3rd (Placental). Delivery is imminent if crowning is visible or contractions are 2 minutes apart and lasting 45 seconds. EMT role: Create a sterile field, support the baby's head, check for nuchal cord, suction mouth then nose. After delivery, clamp/cut the cord, dry and warm the baby, and evaluate with APGAR score. A standard delivery kit includes cord clamps, surgical blade, blankets, and suction.`
    },
    {
      name: 'Newborn Resuscitation (NRP)',
      description: 'Key steps for resuscitating a newborn immediately after birth.',
      context: `Based on the NRP algorithm. After birth, assess: Term gestation? Amniotic fluid clear? Breathing or crying? Good muscle tone? If yes to all, provide routine care. If no, perform initial steps: provide warmth, position and clear airway, dry, stimulate, and reposition. Then evaluate respirations and heart rate (HR). If apneic or HR < 100, provide positive-pressure ventilation (PPV). If HR remains < 60 after effective PPV, begin chest compressions (3:1 ratio with ventilations). Administer epinephrine if HR remains < 60 despite compressions and PPV.`
    },
    {
      name: 'Trauma Assessment',
      description: 'A systematic approach to assessing and managing trauma patients.',
      context: `The trauma assessment begins with Scene Safety and a Primary Survey (GRC-ABC). A Rapid Trauma Assessment (90 seconds) is a head-to-toe exam:
        - Head/Neck: Check DCAP-BTLS, raccoon eyes, Battle's signs, CSF leakage, JVD, tracheal deviation.
        - Chest: Inspect for paradoxical motion (flail chest), listen to breath sounds. Palpate for crepitus and instability.
        - Abdomen: Check all four quadrants for tenderness, rigidity, distension. Look for evisceration.
        - Pelvis: Assess for instability with gentle compression. If positive, apply a pelvic binder.
        - Extremities: Check DCAP-BTLS and PMS (Pulse, Motor, Sensation).
      `
    },
    {
      name: 'IV & Fluid Resuscitation',
      description: 'Principles of intravenous access and fluid therapy in emergency care.',
      context: `
        IV cannulation provides access for fluids and medications. Large bore cannulas (18G green, 16G grey, 14G orange) are used for rapid infusion.
        - Crystalloids: Normal Saline (0.9% NaCl) is used for most bleeding emergencies and DKA. Ringers Lactate replaces water and electrolytes, used for burns and diarrhea. Dextrose solutions provide sugar and water.
        - IV Fluid Bolus Dosage: Adult (500-1000ml), Pediatric (20ml/kg), Neonate (10ml/kg).
        - Procedure: Select site, apply tourniquet, clean site, insert cannula (45 degrees), observe for flashback, remove needle, secure catheter, and document.
      `
    },
    {
      name: 'Emergency Drugs',
      description: 'Common medications used in the pre-hospital environment.',
      context: `
        Key pre-hospital drugs include:
        - Tranexamic Acid (TXA): Anti-fibrinolytic used to treat or prevent excessive blood loss from major trauma or PPH. Adult dose is 1g bolus over 10 mins. Contraindicated with history of seizures or >3 hours from bleeding.
        - Adrenaline (Epinephrine): Used for cardiac arrest and severe allergic reactions.
        - Atropine: Used for bradycardia and organophosphate poisoning.
        - Aspirin: Antiplatelet used for suspected MI.
        - Clopidogrel: Anti-coagulant used for suspected MI.
        - Magnesium Sulphate: Used for eclampsia and severe pre-eclampsia.
        - Midazolam: Benzodiazepine for seizures.
        - Oxytocin: Used for postpartum hemorrhage to contract the uterus.
        - Salbutamol: Bronchodilator for asthma and wheezing.
        - Naloxone: For opioid overdose.
        - Oral Glucose: For hypoglycemia.
      `
    },
    {
      name: 'Medical Terminology',
      description: 'Understanding the building blocks of medical language.',
      context: `
        Medical words are built from prefixes, roots, and suffixes.
        - Common Prefixes: Ante- (before), Brady- (slow), Tachy- (fast), Hyper- (above), Hypo- (below).
        - Combining Words (Roots): Cardio- (heart), Pulmo- (lung), Gastro- (stomach), Neuro- (nerve), Nephro- (kidney).
        - Common Suffixes: -itis (inflammation), -pnea (breathing), -plegia (paralysis), -algia (pain in), -ectomy (surgical removal of).
        - Anatomical Positions: Supine (on back), Prone (on stomach), Fowler's (sitting up), Recovery (on side).
        - Motions: Flexion (movement towards the body), Extension (movement away from the body).
      `
    }
  ];

  getTopics(): string[] {
    return this.emtData.map(topic => topic.name);
  }

  getDescriptionForTopic(topicName: string): string | undefined {
    const topic = this.emtData.find(t => t.name === topicName);
    return topic?.description;
  }

  getContextForTopic(topicName: string): string | undefined {
    const topic = this.emtData.find(t => t.name === topicName);
    return topic?.context;
  }
}
