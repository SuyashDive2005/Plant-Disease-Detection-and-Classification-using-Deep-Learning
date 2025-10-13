import jsPDF from "jspdf";

interface ReportProps {
  disease: string;
  confidence: string;
  plantType: string;
  severity: string;
  description: string;
  treatment: string[];
  prevention: string[];
  timeline: string;
}

const Report = ({
  disease,
  confidence,
  plantType,
  severity,
  description,
  treatment,
  prevention,
  timeline,
}: ReportProps) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("🌱 Plant Disease Report", 14, 20);

    doc.setFontSize(12);
    doc.text(`Plant Type: ${plantType}`, 14, 40);
    doc.text(`Disease: ${disease}`, 14, 50);
    doc.text(`Confidence: ${confidence}%`, 14, 60);
    doc.text(`Severity: ${severity}`, 14, 70);
    doc.text(`Timeline: ${timeline}`, 14, 80);

    doc.setFontSize(14);
    doc.text("Description:", 14, 95);
    doc.setFontSize(11);
    doc.text(doc.splitTextToSize(description, 180), 14, 105);

    doc.setFontSize(14);
    doc.text("Treatment Recommendations:", 14, 130);
    doc.setFontSize(11);
    treatment.forEach((t, i) => {
      doc.text(`- ${t}`, 14, 140 + i * 8);
    });

    doc.setFontSize(14);
    doc.text("Prevention Tips:", 14, 180);
    doc.setFontSize(11);
    prevention.forEach((p, i) => {
      doc.text(`- ${p}`, 14, 190 + i * 8);
    });

    doc.save(`${plantType}_${disease}_Report.pdf`);
  };

  return (
    <button
      onClick={generatePDF}
      className="flex items-center space-x-2 bg-orange-100 hover:bg-orange-200 text-orange-700 px-4 py-2 rounded-full text-sm font-medium transition-colors"
    >
      Download Report
    </button>
  );
};

export default Report;
