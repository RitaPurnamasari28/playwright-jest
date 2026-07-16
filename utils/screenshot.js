const fs = require("fs");
const path = require("path");
const now = new Date();

async function takeScreenshot(page, testName, status = "INFO") {
  const screenshotDir = path.join(process.cwd(), "screenshots");

  fs.mkdirSync(screenshotDir, { recursive: true });

  const safeTestName = (testName || "unknown")
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "_")
    .replace(/\s+/g, "_");

  const timestamp = now
  .toLocaleString("sv-SE")
  .replace(" ", "T")
  .replace(/:/g, "-");

  const screenshotPath = path.join(
    screenshotDir,
    `${status}_${safeTestName}_${timestamp}.png`
  );

  await page.screenshot({
    path: screenshotPath,
    fullPage: true,
  });

  console.log(`Screenshot saved: ${screenshotPath}`);

  return screenshotPath;
}

module.exports = {
  takeScreenshot,
};