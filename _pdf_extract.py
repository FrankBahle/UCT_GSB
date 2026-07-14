from pathlib import Path
from pypdf import PdfReader

pdf_path = Path("Slides/AI_Leadership_in_Action_TNM_Learning_Guide.pdf")
out_path = Path("_pdf_text.txt")

reader = PdfReader(pdf_path)
text = "\n\n".join(page.extract_text() or "" for page in reader.pages)
out_path.write_text(text, encoding="utf-8")
print(f"Extracted {len(reader.pages)} pages to {out_path}")
