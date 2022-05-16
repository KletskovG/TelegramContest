const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto('https://up.htmlacademy.ru/react/9/check/projects');
  await page.waitForTimeout(5000)

  const isAuthRequired = await page.evaluate(() => {
    return Boolean(document.querySelector("#login-email"));
  })
  if (isAuthRequired) {
      await page.type('#login-email', '');
      await page.type('#login-password', '');
      await page.click('input.button');
      await page.screenshot({path: 'auth-process.png'});
      await page.waitForTimeout(5000);
      await page.screenshot({path: 'auth-sucess.png'});
      
      const isProjectsPresented = await page.evaluate(() => {
        return Boolean(document.querySelector('.up-info--check .button--green'));
      })

      if (isProjectsPresented) {
        console.log("I HAVE PROJECT TO CHECK");
        await page.screenshot({path: "have-projects.png"});
      } else {
        console.log("NO PROJECTS")
        await page.screenshot({path: "no-projects.png"});
      }


      await page.goto('https://up.htmlacademy.ru/javascript/25/check/projects');
      await page.screenshot({path: 'second-result.png'})

  } else {
      await page.screenshot({path: 'without-auth.png'});
      const isProjectsPresented = await page.evaluate(() => {
        return Boolean(document.querySelector('.up-info--check .button--green'));
      })

      if (isProjectsPresented) {
        console.log("I HAVE PROJECT TO CHECK");
        await page.screenshot({path: "have-projects.png"});
      }
  }


  
  await browser.close();
})();