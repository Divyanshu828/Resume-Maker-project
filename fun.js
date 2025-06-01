function generateResume() {
  // Get input values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const skills = document.getElementById('skills').value;
  const experience = document.getElementById('experience').value;
  const education = document.getElementById('education').value;

  
  document.getElementById('resumeName').innerHTML = `<strong>Name:</strong> ${name}`;
  document.getElementById('resumeContact').innerHTML = `<strong>Contact:</strong> ${email} | ${phone}`;
  document.getElementById('resumeSkills').innerHTML = `<strong>Skills:</strong><br>${skills.replace(/\n/g, '<br>')}`;
  document.getElementById('resumeExperience').innerHTML = `<strong>Experience:</strong><br>${experience.replace(/\n/g, '<br>')}`;
  document.getElementById('resumeEducation').innerHTML = `<strong>Education:</strong><br>${education.replace(/\n/g, '<br>')}`;
}

function downloadResume() {
  const formData = {
      Name: document.getElementById('name').value.trim(),
      Contact: [
          document.getElementById('phone').value.trim(),
          document.getElementById('email').value.trim(),
      ].filter(Boolean).join(" | "), // Removes empty values and joins with " | " .filter(Boolean) used to remove all false values from an array
      Linkedin: document.getElementById('linkedin').value.trim(),
      CareerObjective: document.getElementById('career').value.trim(),
      Education: document.getElementById('education').value.trim(),
      Skills: document.getElementById('skills').value.trim(),
      Projects: document.getElementById('project').value.trim(),
      Experience: document.getElementById('experience').value.trim(),
      Hobbies: document.getElementById('hobby').value.trim()
  };

  //jsPDF library to generate a PDF
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  let y = 15; // Start position for text

  // Header background
  pdf.setFillColor(250, 145, 71); //  orange color
  pdf.rect(0, 0, 210, 48, "F"); // Full-width rectangle
  pdf.setFillColor(240, 93, 13); //  orange color
  pdf.rect(5, 0, 50, 48, "F");
  
  pdf.setLineWidth(0.5);  //linebar
  pdf.line(10, 48, 200, 48);

  

  // Reset text color to black for content
  pdf.setTextColor(0, 0, 0);

  Object.entries(formData).forEach(([key, value]) => {
      if (value) { // Check if the field is not empty
          if (key === "Name" || key === "Contact" || key === "Linkedin") 
            {
              pdf.setTextColor(255, 255, 255);
              pdf.setFont("Helvetica", "bold");
              pdf.setFontSize(20);
            //   pdf.text(`${key}:`, 10, y);
              pdf.setFont("Helvetica", "bold");
              if(key === "Name")
              {
              pdf.setFontSize(40);
              pdf.text(value, 90, y);
              }
              if(key === "Contact")
              {
              pdf.text(`${key}:`, 10, y-7);
              pdf.setFontSize(18);
              pdf.text(value, 10, y);
              }
              if(key === "Linkedin")
                {
                // pdf.text(`${key}:`, 10, y-5);
                pdf.setFontSize(18);
                pdf.text("My Linkedin", 10, 40);
                pdf.link(10,33,38,10,{url : value});
                }
              
              y += 14; // Move down for next section
            } 
          else 
          {
              pdf.setFont("Helvetica", "bold");
              pdf.setTextColor(0, 0, 0);
              pdf.setFontSize(20);
              pdf.text(`• ${key}:`, 10, y);

              pdf.setFont("Helvetica", "normal");
              pdf.setFontSize(14);

              let splitText = pdf.splitTextToSize(value, 180);
              pdf.text(splitText, 11, y + 7);
              y += splitText.length * 4.9 + 20; // Adjust spacing
              
          }
      }
  });

  pdf.save("Resume.pdf");
}



