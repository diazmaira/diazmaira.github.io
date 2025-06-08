const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const htmlPath = 'index.html';
  const html = fs.readFileSync(path.resolve(htmlPath), 'utf8');
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Eliminar el párrafo handwritten para no esperar animación
  await page.evaluate(() => {
    const handwritten = document.getElementById('handwritten');
    if (handwritten) {
      handwritten.remove();
    }

    // Adapt footer to be present in first page under my name
    const contactInfo = document.getElementById("contact-info");
    contactInfo
    const header = document.getElementsByTagName("header")[0];
    if (contactInfo && header) {
      contactInfo.style.position = "relative";
      contactInfo.style.borderTop = "0";
      header.appendChild(contactInfo);
    }


  });

  // Inyecta CSS para desactivar animaciones AOS, ocultar el botón "Download CV" y modificar el footer
  await page.addStyleTag({
    content: `
      [data-aos] {
          animation: none !important;
          transition: none !important;
          opacity: 1 !important;
          transform: none !important;
      }
      #download-cv {
        display: none !important;
      }
      #contact-info {
        position: static !important;
        width: 100%;
        text-align: center;
        font-size: 0.85rem;
        color: #666;
        background-color: rgba(255, 255, 255, 0.9);
        padding: 0.5rem 0;
        border-top: 1px solid #ddd;
        z-index: auto;
      }
      #contact-info a {
        color: #666;
        text-decoration: none;
        margin: 0 0.5rem;
        transition: color 0.3s;
      }
      #contact-info a:hover {
        color: #000;
      }
      body {
        margin-bottom: 3rem;
        font-size: 80%
      }
    `
  });

  // Generar PDF con márgenes ajustados
  await page.pdf({
    path: 'output.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: '15mm', right: '10mm', bottom: '15mm', left: '10mm' }
  });

  await browser.close();
  console.log('PDF generated: MairaDiaz-CV.pdf');
})();

