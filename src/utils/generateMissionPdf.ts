import { jsPDF } from 'jspdf';
import { MISSION_STAGES, SPACECRAFT_SUBSYSTEMS, MARS_LOCATIONS, COLONY_STRUCTURES, PLANETARY_COMPARISONS } from '../data/missionData';

export function createMissionPdf(): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  // Helper functions for styling
  const drawHeader = (title: string, subtitle: string, pageNum: number) => {
    // Top banner bar
    doc.setFillColor(11, 14, 23);
    doc.rect(0, 0, pageWidth, 24, 'F');

    // Accent line
    doc.setFillColor(245, 158, 11); // Amber
    doc.rect(0, 24, pageWidth, 1, 'F');

    doc.setTextColor(245, 158, 11);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('MISSION: MARS — THE HUMAN ODYSSEY', margin, 11);

    doc.setTextColor(148, 163, 184);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('EXPEDITION FLIGHT DOSSIER & PRD SPECIFICATION', margin, 18);

    doc.setFont('helvetica', 'bold');
    doc.text(`PAGE 0${pageNum} / 04`, pageWidth - margin, 15, { align: 'right' });

    // Section title
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(title, margin, 36);

    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(subtitle, margin, 42);

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(margin, 46, pageWidth - margin, 46);
  };

  const drawFooter = () => {
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);

    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text('CONFIDENTIAL · ARES ODYSSEY INTERPLANETARY INITIATIVE · NASA / ESA / JPL DATASETS', margin, pageHeight - 8);
    doc.text('SOL SYSTEM SECTOR 04 · EXPEDITION ARCHIVES', pageWidth - margin, pageHeight - 8, { align: 'right' });
  };

  // ==========================================
  // PAGE 1: EXECUTIVE BRIEF & MISSION PROFILE
  // ==========================================
  drawHeader('EXECUTIVE BRIEF & EXPEDITION ARCHITECTURE', 'Humanity’s First Permanent Interplanetary Settlement Protocol', 1);

  let y = 54;

  // Mission Overview Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 34, 2, 2, 'FD');

  doc.setTextColor(217, 119, 6);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('MISSION MANDATE', margin + 6, y + 8);

  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  const mandateText =
    'Mission: Mars is humanity’s landmark enterprise to establish an enduring, self-sustaining presence on the Red Planet. Chronicling the complete journey from Earth orbital launch, through 54.6 million kilometers of deep space transit, to touchdown and the operational establishment of Ares Base Alpha.';
  const splitMandate = doc.splitTextToSize(mandateText, contentWidth - 12);
  doc.text(splitMandate, margin + 6, y + 15);

  y += 42;

  // Seven Stages Summary Table
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('MISSION STAGES & OPERATIONAL SEQUENCE', margin, y);
  y += 6;

  doc.setFillColor(15, 23, 42);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('PHASE', margin + 4, y + 5);
  doc.text('NAME', margin + 26, y + 5);
  doc.text('OPERATIONAL PROFILE', margin + 70, y + 5);

  y += 7;

  MISSION_STAGES.forEach((stage, idx) => {
    doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
    doc.rect(margin, y, contentWidth, 8, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, y, contentWidth, 8, 'S');

    doc.setTextColor(217, 119, 6);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(`STAGE ${stage.index}`, margin + 4, y + 5.5);

    doc.setTextColor(15, 23, 42);
    doc.text(stage.name.toUpperCase(), margin + 26, y + 5.5);

    doc.setTextColor(71, 85, 105);
    doc.setFont('helvetica', 'normal');
    doc.text(stage.subtitle, margin + 70, y + 5.5);

    y += 8;
  });

  y += 8;

  // Key Physical Comparison
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('CRITICAL PLANETARY CONSTANTS (EARTH vs MARS)', margin, y);
  y += 6;

  const quickStats = [
    { label: 'Surface Gravity', earth: '9.81 m/s² (1.00 g)', mars: '3.72 m/s² (0.38 g)', note: 'Demands strict resistance exercise' },
    { label: 'Atmospheric Pressure', earth: '101.3 kPa (1.00 atm)', mars: '0.61 kPa (<1%)', note: 'Armstrong limit: Blood boils without suit' },
    { label: 'Mean Temperature', earth: '+14.9 °C', mars: '−63.0 °C', note: 'Swings from −140°C to +20°C' },
    { label: 'Dominant Gas', earth: '78% Nitrogen / 21% O2', mars: '95.3% CO2', note: 'Feedstock for MOXIE oxygen generation' },
    { label: 'Annual Radiation', earth: '0.33 mSv / year', mars: '240 – 300 mSv / yr', note: 'Requires 3m regolith shielding' },
    { label: 'Radio Signal Lag', earth: '< 0.05 seconds', mars: '3.1 to 22.3 minutes', note: 'Mandates total vehicle autonomy' },
  ];

  doc.setFillColor(15, 23, 42);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('PARAMETER', margin + 4, y + 5);
  doc.text('EARTH BASELINE', margin + 48, y + 5);
  doc.text('MARS TARGET', margin + 92, y + 5);
  doc.text('ENGINEERING IMPLICATION', margin + 130, y + 5);

  y += 7;

  quickStats.forEach((st, idx) => {
    doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
    doc.rect(margin, y, contentWidth, 7, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, y, contentWidth, 7, 'S');

    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text(st.label, margin + 4, y + 4.8);

    doc.setTextColor(37, 99, 235);
    doc.text(st.earth, margin + 48, y + 4.8);

    doc.setTextColor(217, 119, 6);
    doc.text(st.mars, margin + 92, y + 4.8);

    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'normal');
    doc.text(st.note, margin + 130, y + 4.8);

    y += 7;
  });

  drawFooter();

  // ==========================================
  // PAGE 2: SPACECRAFT & DEEP SPACE SYSTEMS
  // ==========================================
  doc.addPage();
  drawHeader('SPACECRAFT SUBSYSTEMS & TRANSIT TELEMETRY', 'Ares Cycler Interplanetary Vehicle Specifications', 2);

  y = 54;

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('PRIMARY FLIGHT SUBSYSTEMS', margin, y);
  y += 6;

  SPACECRAFT_SUBSYSTEMS.forEach((sub) => {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, y, contentWidth, 34, 2, 2, 'FD');

    // Title and status
    doc.setTextColor(217, 119, 6);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text(sub.name.toUpperCase(), margin + 6, y + 7);

    doc.setFillColor(236, 253, 245);
    doc.setDrawColor(167, 243, 208);
    doc.roundedRect(pageWidth - margin - 26, y + 3, 20, 5, 1, 1, 'FD');
    doc.setTextColor(5, 150, 105);
    doc.setFontSize(7);
    doc.text(sub.status.toUpperCase(), pageWidth - margin - 16, y + 6.5, { align: 'center' });

    // Tagline & description
    doc.setTextColor(71, 85, 105);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    const splitDesc = doc.splitTextToSize(sub.description, contentWidth - 12);
    doc.text(splitDesc, margin + 6, y + 13);

    // Specs line
    let specX = margin + 6;
    doc.setFontSize(7.5);
    sub.specs.forEach((spec) => {
      doc.setTextColor(100, 116, 139);
      doc.setFont('helvetica', 'normal');
      doc.text(`${spec.label}: `, specX, y + 29);
      const labelWidth = doc.getTextWidth(`${spec.label}: `);
      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.text(spec.value, specX + labelWidth, y + 29);
      specX += labelWidth + doc.getTextWidth(spec.value) + 6;
    });

    y += 38;
  });

  // Transit Trajectory Note
  y += 2;
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(251, 191, 36);
  doc.roundedRect(margin, y, contentWidth, 26, 2, 2, 'FD');

  doc.setTextColor(180, 83, 9);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('TRAJECTORY & LAUNCH WINDOW LOGISTICS (HOHMANN MINIMUM ENERGY)', margin + 6, y + 7);

  doc.setTextColor(120, 53, 15);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  const trajectoryText =
    'Earth and Mars reach orbital opposition every 26 months (780 days). Trans-Mars Injection burns require delta-V ~3.8 km/s from Low Earth Orbit. Transit duration ranges between 180 and 210 days. Planetary approach requires either high-energy propulsive retro-burns or guided hypersonic aerobraking through the Martian upper mesosphere.';
  const splitTraj = doc.splitTextToSize(trajectoryText, contentWidth - 12);
  doc.text(splitTraj, margin + 6, y + 13);

  drawFooter();

  // ==========================================
  // PAGE 3: MARS TOPOGRAPHY & RECON SITES
  // ==========================================
  doc.addPage();
  drawHeader('SURFACE TOPOGRAPHY & RECONNAISSANCE SITES', 'Geological Targets, Ancient River Deltas & Water Ice Reservoirs', 3);

  y = 54;

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('PRIMARY GEOGRAPHIC & SCIENTIFIC LANDMARKS', margin, y);
  y += 6;

  MARS_LOCATIONS.forEach((loc) => {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, y, contentWidth, 31, 2, 2, 'FD');

    // Title and type
    doc.setTextColor(217, 119, 6);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text(loc.name.toUpperCase(), margin + 6, y + 7);

    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(`· ${loc.designation} (${loc.type})`, margin + 6 + doc.getTextWidth(loc.name.toUpperCase()) + 3, y + 7);

    // Coordinates & elevation
    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text(`COORDS: ${loc.coordinates}   |   DATUM: ${loc.elevation}   |   SCALE: ${loc.diameter}`, margin + 6, y + 13);

    // Description & scientific value
    doc.setTextColor(71, 85, 105);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    const splitLocDesc = doc.splitTextToSize(loc.description, contentWidth - 12);
    doc.text(splitLocDesc, margin + 6, y + 19);

    doc.setTextColor(217, 119, 6);
    doc.setFont('helvetica', 'bold');
    doc.text('EXPLORATION MANDATE: ', margin + 6, y + 27.5);
    const manLabelWidth = doc.getTextWidth('EXPLORATION MANDATE: ');
    doc.setTextColor(51, 65, 85);
    doc.setFont('helvetica', 'normal');
    const splitSci = doc.splitTextToSize(loc.scientificValue, contentWidth - 12 - manLabelWidth);
    doc.text(splitSci[0] || '', margin + 6 + manLabelWidth, y + 27.5);

    y += 35;
  });

  drawFooter();

  // ==========================================
  // PAGE 4: ARES BASE ALPHA & FUTURE VISION
  // ==========================================
  doc.addPage();
  drawHeader('ARES BASE ALPHA & THE INTERPLANETARY FUTURE', 'Permanent Habitat Infrastructure, ISRU Propellant & Epilogue', 4);

  y = 54;

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('SETTLEMENT ARCHITECTURE SPECIFICATIONS (ARES BASE ALPHA)', margin, y);
  y += 6;

  COLONY_STRUCTURES.forEach((struct) => {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, y, contentWidth, 23, 1.5, 1.5, 'FD');

    doc.setTextColor(217, 119, 6);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text(struct.name.toUpperCase(), margin + 5, y + 6);

    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text(`[ ${struct.category} ]`, margin + 5 + doc.getTextWidth(struct.name.toUpperCase()) + 3, y + 6);

    doc.text(`CAPACITY: ${struct.crewCapacity}   |   POWER: ${struct.powerDraw}   |   SHIELDING: ${struct.shielding}`, pageWidth - margin - 5, y + 6, { align: 'right' });

    doc.setTextColor(71, 85, 105);
    doc.setFontSize(7.5);
    const splitStructDesc = doc.splitTextToSize(struct.description, contentWidth - 10);
    doc.text(splitStructDesc[0] || '', margin + 5, y + 12);

    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'bold');
    doc.text(`CORE FUNCTION: `, margin + 5, y + 18);
    const fLabelWidth = doc.getTextWidth(`CORE FUNCTION: `);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const splitFunc = doc.splitTextToSize(struct.keyFunction, contentWidth - 10 - fLabelWidth);
    doc.text(splitFunc[0] || '', margin + 5 + fLabelWidth, y + 18);

    y += 26;
  });

  y += 2;

  // Final Inscription Quote Box
  doc.setFillColor(11, 14, 23);
  doc.rect(margin, y, contentWidth, 24, 'F');
  doc.setFillColor(245, 158, 11);
  doc.rect(margin, y, 2, 24, 'F');

  doc.setTextColor(245, 158, 11);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('THE INTERPLANETARY IMPERATIVE', margin + 8, y + 7);

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('"THE FUTURE IS NOT JUST SOMEWHERE WE GO. IT IS SOMETHING WE BUILD."', margin + 8, y + 14);

  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('Ares Odyssey Expedition 01 · Certified by International Mars Exploration Directorate', margin + 8, y + 19.5);

  drawFooter();

  return doc;
}

export function downloadMissionPdf(fileName: string = 'Mission_Mars_The_Human_Odyssey_Dossier.pdf') {
  const doc = createMissionPdf();
  doc.save(fileName);
}
