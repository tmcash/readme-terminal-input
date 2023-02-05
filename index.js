// packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");

// array of questions for user input
const questions = [
  {
    type: "input",
    message: "Enter project tile:",
    name: "title",
    // default: "README Generator",
    validate: validateInput,
  },
  {
    type: "input",
    message: "Enter project description:",
    name: "description",
    // default: "This project generates a README.",
    validate: validateInput,
  },
  {
    type: "input",
    message: "Installation instructions:",
    name: "installation",
    // default: "No installation needed.",
    validate: validateInput,
  },
  {
    type: "input",
    message: "Usage:",
    name: "usage",
    // default: "Use this application to generate a professional README.",
    validate: validateInput,
  },
  {
    type: "list",
    choices: [
      {
        name: "Apache license 2.0",
        value:
          "Apache license 2.0|https://img.shields.io/badge/License-Apache_2.0-blue.svg",
      },
      {
        name: "Artistic license 2.0",
        value:
          "Artistic license 2.0|https://img.shields.io/badge/License-Artistic_2.0-0298c3.svg",
      },
      {
        name: "Boost Software License 1.0",
        value:
          "Boost Software License 1.0|https://img.shields.io/badge/License-Boost_1.0-lightblue.svg",
      },
      {
        name: "BSD 2-clause",
        value:
          "BSD 2-clause|https://img.shields.io/badge/License-BSD_2--Clause-orange.svg",
      },
      {
        name: "BSD 3-clause",
        value:
          "BSD 3-clause|https://img.shields.io/badge/License-BSD_3--Clause-blue.svg",
      },
      {
        name: "Creative Commons license family",
        value:
          "Creative Commons license family|https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg",
      },
      
      {
        name: "Eclipse Public License 1.0",
        value:
          "Eclipse Public License 1.0|https://img.shields.io/badge/License-EPL_1.0-red.svg",
      },
      {
        name: "GNU Affero General Public License v3.0",
        value:
          "GNU Affero General Public License v3.0|https://img.shields.io/badge/License-AGPL_v3-blue.svg",
      },
      {
        name: "GNU General Public License v2.0",
        value:
          "GNU General Public License v2.0|https://img.shields.io/badge/License-GPL_v2-blue.svg",
      },
      {
        name: "GNU General Public License v3.0",
        value:
          "GNU General Public License v3.0|https://img.shields.io/badge/License-GPLv3-blue.svg",
      },
      {
        name: "GNU Lesser General Public License v3.0",
        value:
          "GNU Lesser General Public License v3.0|https://img.shields.io/badge/License-LGPL_v3-blue.svg",
      },
      {
        name: "ISC",
        value: "ISC|https://img.shields.io/badge/License-ISC-blue.svg",
      },
      {
        name: "MIT",
        value: "MIT|https://img.shields.io/badge/License-MIT-yellow.svg",
      },
      {
        name: "Mozilla Public License 2.0",
        value:
          "Mozilla Public License 2.0|https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg",
      },
      {
        name: "SIL Open Font License 1.1",
        value:
          "SIL Open Font License 1.1|https://img.shields.io/badge/License-OFL_1.1-lightgreen.svg",
      },
      {
        name: "The Unlicense",
        value:
          "The Unlicense|https://img.shields.io/badge/license-Unlicense-blue.svg",
      },
      {
        name: "zLib License",
        value:
          "zLib License|https://img.shields.io/badge/License-Zlib-lightgrey.svg",
      },
    ],
    message: "Choose a license:",
    name: "license",
    // default: "MIT|https://img.shields.io/badge/License-MIT-yellow.svg",
    validate: validateInput,
  },
  {
    type: "input",
    message: "Contribution guidelines:",
    name: "contributing",
    // default: "Fork the code to make contributions!",
    validate: validateInput,
  },
  {
    type: "input",
    message: "Test instructions:",
    name: "tests",
    // default: "Test code in the command prompt.",
    validate: validateInput,
  },
  {
    type: "input",
    message: "GitHub username:",
    name: "username",
    // default: "mtstall",
    validate: validateInput,
  },
  {
    type: "input",
    message: "Email:",
    name: "email",
    // default: "mtstallings95@gmail.com",
    validate: validateInput,
  },
];

// creating a function for question prompts
function askQuestions() {
  return inquirer.prompt(questions);
}

// function to generate text for readme file
function generateReadme(response) {
  const licenseInfo = response.license.split("|");
  return `
![License licenseInfo](${licenseInfo[1]})  
# ${response.title}
## Description
${response.description}
## Table of Contents
[Installation](#installation)  
[Usage](#usage)  
[License](#license)  
[Constributing](#contributing)  
[Tests](#tests)  
[Questions](#questions)
## Installation
${response.installation}
## Usage
${response.usage}
## License
This application is covered under the ${licenseInfo[0]} license.
## Contributing
${response.contributing}
## Tests
${response.tests}
## Questions
GitHub profile: [tmcash](https://www.github.com/${response.username})    
Email address: ${response.email}  
Please email me to reach me with additional questions.`;
}

function validateInput(input) {
  if (input === "") {
    console.log("Please enter a value.");
    return false;
  } else {
    return true;
  }
}

// call askQuestions function to run questions, then create readme file with text generated from generateReadme function
function init() {
  askQuestions().then((response) => {
    fs.writeFile("./README.md", generateReadme(response), (err) =>
      err ? console.error(err) : console.log("Readme generated!")
    );
  });
}

init();