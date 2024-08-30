"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const mammoth_1 = __importDefault(require("mammoth"));
const documentTypes = [
    {
        name: "Project Overview Document",
        sections: [
            { name: "Introduction" },
            { name: "Key Features" },
            { name: "Target User" },
            { name: "User Access Levels" },
            { name: "Purpose" },
            { name: "Technology Stack" },
            { name: "Conclusion" },
        ],
        minimumWordCount: 500,
    },
];
function readFile(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const extension = path_1.default.extname(filePath).toLowerCase();
        if (extension === ".pdf") {
            const dataBuffer = fs_1.default.readFileSync(filePath);
            const data = yield (0, pdf_parse_1.default)(dataBuffer);
            return data.text;
        }
        else if (extension === ".docx") {
            const result = yield mammoth_1.default.extractRawText({ path: filePath });
            return result.value;
        }
        else if (extension === ".txt" || extension === ".md") {
            return fs_1.default.readFileSync(filePath, "utf8");
        }
        else {
            throw new Error("Unsupported file type");
        }
    });
}
function evaluateSection(content, section) {
    const sectionRegex = new RegExp(`^#+\\s+${section.name}`, "im");
    const sectionMatch = content.match(sectionRegex);
    if (!sectionMatch) {
        return {
            valid: false,
            feedback: `Section "${section.name}" is missing.`,
            wordCount: 0,
        };
    }
    const sectionStart = sectionMatch.index;
    const nextSectionRegex = new RegExp(`^#+\\s+`, "im");
    const nextSectionMatch = content.slice(sectionStart + sectionMatch[0].length).match(nextSectionRegex);
    const sectionEnd = nextSectionMatch
        ? sectionStart + sectionMatch[0].length + nextSectionMatch.index
        : content.length;
    const sectionContent = content.slice(sectionStart, sectionEnd).trim();
    const wordCount = sectionContent.split(/\s+/).filter((word) => word.length > 0).length;
    let feedback = `Section "${section.name}" is present. Word count: ${wordCount}.`;
    let valid = true;
    if (wordCount < 50) {
        feedback += ` However, the section content seems insufficient. Consider adding more details.`;
        valid = false;
    }
    return { valid, feedback, wordCount };
}
function evaluateDocument(content, criteria) {
    const words = content.split(/\s+/).filter((word) => word.length > 0);
    const feedback = [];
    const missingOrEmptySections = [];
    let score = 0;
    let totalScore = criteria.sections.length + 1; // One point per section + one for word count
    // Check word count
    if (criteria.minimumWordCount !== undefined) {
        if (words.length >= criteria.minimumWordCount) {
            score += 1;
        }
        else {
            feedback.push(`Word count (${words.length}) is below the minimum requirement of ${criteria.minimumWordCount}.`);
        }
    }
    // Check sections
    criteria.sections.forEach((section) => {
        const result = evaluateSection(content, section);
        feedback.push(result.feedback);
        if (result.valid) {
            score += 1;
        }
        else {
            missingOrEmptySections.push(section.name);
        }
    });
    const finalScore = (score / totalScore) * 100;
    return {
        name: criteria.name,
        score: finalScore,
        feedback,
        missingOrEmptySections,
    };
}
function evaluateDocumentFile(documentType, filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const criteria = documentTypes.find((type) => type.name === documentType);
        if (!criteria) {
            throw new Error(`Unknown document type: ${documentType}`);
        }
        try {
            const content = yield readFile(filePath);
            return evaluateDocument(content, criteria);
        }
        catch (error) {
            return {
                name: documentType,
                score: 0,
                feedback: [`Error reading or evaluating file: ${error === null || error === void 0 ? void 0 : error.message}`],
                missingOrEmptySections: [],
            };
        }
    });
}
function generateReport(result, outputPath) {
    const report = `
Document Evaluation Report
==========================
Document Type: ${result.name}
Score: ${result.score.toFixed(2)}%

Feedback:
${result.feedback.map((item) => `- ${item}`).join("\n")}

Summary:
- Total word count: ${result.feedback.reduce((acc, curr) => {
        const match = curr.match(/Word count: (\d+)/);
        return acc + (match ? parseInt(match[1], 10) : 0);
    }, 0)}
- Sections evaluated: ${result.feedback.length}
- Overall compliance: ${result.score.toFixed(2)}%

Missing or Empty Sections:
${result.missingOrEmptySections.length > 0 ? result.missingOrEmptySections.map((section) => `- ${section}`).join("\n") : "None"}
`;
    fs_1.default.writeFileSync(outputPath, report);
    console.log(`Report generated at: ${outputPath}`);
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const documentType = "Project Overview Document";
            const filePath = path_1.default.join(__dirname, "project-overview.md");
            const outputPath = path_1.default.join(__dirname, "evaluation_report.txt");
            const fileContent = yield readFile(filePath);
            console.log("File content length:", fileContent.length);
            console.log("First 100 characters:", fileContent.slice(0, 100));
            const result = yield evaluateDocumentFile(documentType, filePath);
            generateReport(result, outputPath);
        }
        catch (error) {
            console.error("Error:", error === null || error === void 0 ? void 0 : error.message);
        }
    });
}
main();
// import fs from 'fs';
// import path from 'path';
// import pdfParse from 'pdf-parse';
// import mammoth from 'mammoth';
// interface DocumentCriteria {
//   name: string;
//   requiredSections: string[];
//   minimumWordCount: number;
//   additionalChecks: ((content: string) => { passed: boolean; feedback: string })[];
// }
// interface EvaluationResult {
//   name: string;
//   score: number;
//   feedback: string[];
// }
// const documentTypes: DocumentCriteria[] = [
//     {
//       name: "Knowledge Transfer Videos",
//       requiredSections: ["System or Solution Architecture", "Coding structure and guidelines", "Version Control and Release Guideline (GIT)"],
//       minimumWordCount: 200,
//       additionalChecks: [
//         (content) => ({
//           passed: content.toLowerCase().includes("sharepoint"),
//           feedback: "Videos should be stored in SharePoint"
//         }),
//         (content) => ({
//           passed: content.toLowerCase().includes("updated for major change"),
//           feedback: "Videos must be updated for major changes"
//         })
//       ]
//     },
//     {
//       name: "Project README File",
//       requiredSections: ["Quick Tech Intro", "Installation", "Pre-requisites", "Run Commands", "Contribution Guidelines", "Version Control"],
//       minimumWordCount: 300,
//       additionalChecks: [
//         (content) => ({
//           passed: content.toLowerCase().includes("technology list") && content.toLowerCase().includes("version"),
//           feedback: "Must include technology list and versions"
//         }),
//         (content) => ({
//           passed: content.toLowerCase().includes("run guidelines"),
//           feedback: "Must include project run guidelines"
//         })
//       ]
//     },
//     {
//       name: "System Architecture Diagrams",
//       requiredSections: ["Components", "Interactions", "Boundaries", "Security", "Scalability", "Users"],
//       minimumWordCount: 150,
//       additionalChecks: [
//         (content) => ({
//           passed: content.toLowerCase().includes("plantuml") || content.toLowerCase().includes("draw.io") || content.toLowerCase().includes("lucid chart"),
//           feedback: "Should use a live diagram tool (plantUML / draw.io / Lucid chart)"
//         }),
//         (content) => ({
//           passed: !content.toLowerCase().includes("generic diagram"),
//           feedback: "Should not use generic diagrams"
//         })
//       ]
//     },
//     {
//       name: "Coding Structure and Standard Guidelines",
//       requiredSections: ["Clean Code", "Framework Guidelines", "Best Practices", "Version Control Guide"],
//       minimumWordCount: 400,
//       additionalChecks: [
//         (content) => ({
//           passed: content.toLowerCase().includes("git flow") || content.toLowerCase().includes("branching") || content.toLowerCase().includes("merging"),
//           feedback: "Should include Git workflow, branching, and merging guidelines"
//         })
//       ]
//     },
//     {
//       name: "Code Review Process and Checklist",
//       requiredSections: ["Review Process", "Checklist Items", "Review Frequency"],
//       minimumWordCount: 300,
//       additionalChecks: [
//         (content) => ({
//           passed: content.toLowerCase().includes("pull request"),
//           feedback: "Pull Request based review is recommended"
//         }),
//         (content) => ({
//           passed: content.toLowerCase().includes("weekly") || content.toLowerCase().includes("regular interval"),
//           feedback: "Reviews must be done at regular intervals, at least weekly"
//         })
//       ]
//     },
//     {
//       name: "DevOps and Server Details",
//       requiredSections: ["Server Details", "Deployment Process", "CI/CD Details"],
//       minimumWordCount: 400,
//       additionalChecks: [
//         (content) => ({
//           passed: content.toLowerCase().includes("dev") && content.toLowerCase().includes("uat") && content.toLowerCase().includes("production"),
//           feedback: "Should include details for Dev, UAT, and Production servers"
//         }),
//         (content) => ({
//           passed: content.toLowerCase().includes("ci/cd") || content.toLowerCase().includes("deployment script"),
//           feedback: "Should include CI/CD details or deployment script information"
//         })
//       ]
//     }
//   ];
// async function readFile(filePath: string): Promise<string> {
//   const extension = path.extname(filePath).toLowerCase();
//   if (extension === '.pdf') {
//     const dataBuffer = fs.readFileSync(filePath);
//     const data = await pdfParse(dataBuffer);
//     return data.text;
//   } else if (extension === '.docx') {
//     const result = await mammoth.extractRawText({path: filePath});
//     return result.value;
//   } else if (extension === '.txt' || extension === '.md') {
//     return fs.readFileSync(filePath, 'utf8');
//   } else {
//     throw new Error('Unsupported file type');
//   }
// }
// function evaluateDocument(content: string, criteria: DocumentCriteria): EvaluationResult {
//   const words = content.split(/\s+/).filter(word => word.length > 0);
//   const sections = content.split(/#{2,}/);
//   let score = 0;
//   const feedback: string[] = [];
//   // Check word count
//   if (words.length >= criteria.minimumWordCount) {
//     score += 0.25;
//   } else {
//     feedback.push(`Word count (${words.length}) is below the minimum requirement of ${criteria.minimumWordCount}.`);
//   }
//   // Check required sections
//   const presentSections = new Set(sections.map(section => section.trim().split('\n')[0].toLowerCase()));
//   const missingRequiredSections = criteria.requiredSections.filter(
//     section => !presentSections.has(section.toLowerCase())
//   );
//   if (missingRequiredSections.length === 0) {
//     score += 0.25;
//   } else {
//     feedback.push(`Missing required sections: ${missingRequiredSections.join(", ")}`);
//   }
//   // Perform additional checks
//   let additionalChecksPassed = 0;
//   for (const check of criteria.additionalChecks) {
//     const result = check(content);
//     if (result.passed) {
//       additionalChecksPassed++;
//     } else {
//       feedback.push(result.feedback);
//     }
//   }
//   score += (additionalChecksPassed / criteria.additionalChecks.length) * 0.5;
//   return {
//     name: criteria.name,
//     score,
//     feedback: feedback.length > 0 ? feedback : ["Document meets all criteria."],
//   };
// }
// async function evaluateDocumentFile(documentType: string, filePath: string): Promise<EvaluationResult> {
//   const criteria = documentTypes.find(type => type.name === documentType);
//   if (!criteria) {
//     throw new Error(`Unknown document type: ${documentType}`);
//   }
//   try {
//     const content = await readFile(filePath);
//     console.log(content);
//     return evaluateDocument(content, criteria);
//   } catch (error:any) {
//     return {
//       name: documentType,
//       score: 0,
//       feedback: [`Error reading or evaluating file: ${error?.message}`],
//     };
//   }
// }
// function printReport(result: EvaluationResult) {
//   console.log("\nDocument Evaluation Report");
//   console.log("==========================");
//   console.log(`Document Type: ${result.name}`);
//   console.log(`Score: ${(result.score * 100).toFixed(2)}%`);
//   console.log("Feedback:");
//   result.feedback.forEach(item => console.log(`- ${item}`));
// }
// // Example usage
// async function main() {
//   try {
//     const path = __dirname + '/Technical KB Sample and Details.docx';
//     const result = await evaluateDocumentFile("Knowledge Transfer Videos", path);
//     printReport(result);
//   } catch (error:any) {
//     console.error("Error:", error?.message);
//   }
// }
// main();
