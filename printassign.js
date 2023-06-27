async function addTextToPDF() {
    const fileUrl = 'assignment.pdf';
    const courseInput = document.getElementById('course_code').value;
    const studentInput = document.getElementById('roll').value;
    const teacherInput = document.getElementById('teacher_name').value;


    // const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async function() {
      const pdfBytes = await fetch(fileUrl).then(response => response.arrayBuffer());
      const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);

      const timesNewRomanFont = await pdfDoc.embedFont(PDFLib.StandardFonts.TimesRoman);

      const page = pdfDoc.getPages()[0];


      var data={
        course_name: course_details[courseInput].name,
        course_code: course_details[courseInput].code,
        assignment_name: document.getElementById('assign_name').innerText,
        student_name: student_data['n'+studentInput].name,
        student_section: student_data['n'+studentInput].section,
        student_series: student_data['n'+studentInput].series,
        teacher_name: teacher_list[teacherInput].name,
        teacher_designation: [teacherInput].designation,
      }


      page.drawText(data.course_name, {
        x: 210,
        y: 350,
        size: 12,
        font: timesNewRomanFont,
        color: PDFLib.rgb(0, 0, 0),
      });

      page.drawText(data.course_code, {
        x: 210,
        y: 317,
        size: 12,
        font: timesNewRomanFont,
        color: PDFLib.rgb(0, 0, 0),
      });

      page.drawText(data.assignment_name, {
        x: 201,
        y: 284,
        size: 12,
        font: timesNewRomanFont,
        color: PDFLib.rgb(0, 0, 0),
      });

      page.drawText(data.student_name, {
        x: 120,
        y: 185,
        size: 12,
        font: timesNewRomanFont,
        color: PDFLib.rgb(0, 0, 0),
      });
      page.drawText(data.student_roll, {
        x: 110,
        y: 170,
        size: 12,
        font: timesNewRomanFont,
        color: PDFLib.rgb(0, 0, 0),
      });
      page.drawText(data.student_section, {
        x: 130,
        y: 153,
        size: 12,
        font: timesNewRomanFont,
        color: PDFLib.rgb(0, 0, 0),
      });

      page.drawText(data.student_series, {
        x: 120,
        y: 135,
        size: 12,
        font: timesNewRomanFont,
        color: PDFLib.rgb(0, 0, 0),
      });

      page.drawText(data.teacher_name, {
        x: 320,
        y: 185,
        size: 12,
        font: timesNewRomanFont,
        color: PDFLib.rgb(0, 0, 0),
      });

      page.drawText(data.teacher_designation, {
        x: 320,
        y: 170,
        size: 12,
        font: timesNewRomanFont,
        color: PDFLib.rgb(0, 0, 0),
      });

      const modifiedPDFBytes = await pdfDoc.save();
      const blob = new Blob([modifiedPDFBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'modified_pdf.pdf';
      link.click();

      URL.revokeObjectURL(url);
    };

    reader.readAsArrayBuffer(fileUrl);
  }