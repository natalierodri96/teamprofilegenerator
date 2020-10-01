const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMember = [];
function app() {
    function getManager() {
        inquirer.prompt( [
            {
               type: "input",
               name: "managerName",
               message: "What is your Manager's Name?" 
            },
            {
                type:"input",
                name:"managerId",
                message:"What is your ID?"
            },
            {
                type:"input",
                name:"managerEmail",
                message: "What is your email?"
            }
            {
                type:"input",
                name:"officeNumber",
                message:"What is the offic number for the manager?"
            }
        ]).then(response => {
           const manager = new Manager(response.manager.name, response.managerId, response.managerEmail, response.officeNumber);
           teamMember.push(manager);
           // id.push(response.engineerId);
           addingNewMember();
        })
        function getEngineer() {
            inquirer.prompt([
                {
                    {
                        type: "input",
                        name: "egineerName",
                        message: "What is your Engineer's Name?" 
                     },
                     {
                         type:"input",
                         name:"engineerId",
                         message:"What is your ID?"
                     },
                     {
                         type:"input",
                         name:"engineerEmail",
                         message: "What is your email?"
                     }
                     {
                         type:"input",
                         name:"github",
                         message:"What is your github username?"
                     }
            ]).then(response => {
                const engineer = new Engineer(response.engineerName, response.managerEmail, response.engineerId, response.github)
                teamMember.push(engineer);
                //id.push(response.engineerId);
                addingNewMember();
            })
        }
            function getIntern() {
                inquirer.prompt([
                    {
                        type: "input",
                        name: "internName",
                        message: "What is your Interns's Name?" 
                     },
                     {
                         type:"input",
                         name:"internId",
                         message:"What is your ID?"
                     },
                     {
                         type:"input",
                         name:"internEmail",
                         message: "What is your email?"
                     },
                     {
                         type:"input",
                         name:"school",
                         message:"What school did you attend?"
                     }
                    ]).then(response => {
                        const intern = new Intern(response.internName, response.internId, response.internEmail, response.school);
                    teamMember.push(intern);
                    //id push (response.internId);
                    addingNewMember();
                    })
                    }
                    function addingNewMember() {
                        inquirer.prompt([
                            {
                                type: "checkbox",
                                name: "selectemployees",
                                message: "Which Employee?",
                                choices: [
                                    "engineer",
                                    "manager",
                                    "intern",
                                    "done"
                                ]
                             }
                        ]}then(response => {
                            const role = response.selectemployees;
                            if (role == "manager") {
                                getManager();
                            }
                            else if (role =="engineer") {
                                getEngineer(); 
                            }
                            else if (role== "intern") {
                                getIntern();
                            }
                            else if (role == "done") {
                                renderTeam();
                            }
                        });
                    }
                    addingNewMember()
                    }
                    function renderTeam () {
                        fs.writeFileSync(outputPath, render(teamMember),"utf-8");
                    }
                    app();
                    //function generateHTML{answers}
                    
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
