# Project Overview Document Evaluation System

## Introduction

This system automatically evaluates project overview documents based on predefined criteria. It assesses the structure, content, and completeness of the document, providing a quantitative score and qualitative feedback.

## Requirements

- Node.js
- TypeScript
- npm (Node Package Manager)

## Dependencies

- fs (File System module)
- path (Path module)
- keyword-extractor

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/muktar-bs/document-evaluator.git
   ```
2. Navigate to the project directory:
   ```
   cd project-overview-evaluator
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Project Structure

- `index.ts`: Main TypeScript file containing the evaluation logic
- `project-overview.md`: The project overview document to be evaluated (place this in the same directory as `index.ts`)

## Key Components

### Interfaces

1. `Section`: Represents a section of the document
   - `name`: string
   - `requiredKeywords`: string[]
   - `minWordCount`: number

2. `DocumentType`: Defines the expected structure of the document
   - `name`: string
   - `sections`: Section[]
   - `overallMinWordCount`: number

3. `EvaluationResult`: Stores the results of the document evaluation
   - `documentType`: string
   - `overallScore`: number
   - `sectionScores`: { [key: string]: number }
   - `feedback`: string[]
   - `missingKeywords`: { [key: string]: string[] }
   - `wordCount`: number

### Main Functions

1. `readDocument(filePath: string): string`
   - Reads the content of the document from a file

2. `extractKeywords(text: string): string[]`
   - Extracts keywords from given text using the keyword-extractor library

3. `evaluateSection(content: string, section: Section): { score: number; feedback: string; missingKeywords: string[] }`
   - Evaluates a single section of the document

4. `evaluateDocument(content: string, documentType: DocumentType): EvaluationResult`
   - Evaluates the entire document based on the defined criteria

5. `generateReport(result: EvaluationResult): string`
   - Generates a formatted report of the evaluation results

6. `evaluateProjectOverview(filePath: string): void`
   - Orchestrates the entire evaluation process

## Configuration

The `projectOverviewType` object in `index.ts` defines the expected structure and evaluation criteria for the document:

```typescript
const projectOverviewType: DocumentType = {
  name: 'Project Overview',
  sections: [
    { name: 'Introduction', requiredKeywords: ['purpose', 'scope', 'objectives'], minWordCount: 100 },
    { name: 'Key Features', requiredKeywords: ['functionality', 'benefits', 'unique'], minWordCount: 150 },
    { name: 'Target User', requiredKeywords: ['audience', 'user', 'demographic'], minWordCount: 75 },
    { name: 'User Access Levels', requiredKeywords: ['roles', 'permissions', 'admin'], minWordCount: 100 },
    { name: 'Purpose', requiredKeywords: ['goal', 'aim', 'objective'], minWordCount: 75 },
    { name: 'Technology Stack', requiredKeywords: ['frontend', 'backend', 'database'], minWordCount: 100 },
    { name: 'Conclusion', requiredKeywords: ['summary', 'future', 'next steps'], minWordCount: 75 },
  ],
  overallMinWordCount: 500,
};
```

Modify this object to customize the evaluation criteria.

## Usage

1. Place the project overview document (named `project-overview.md`) in the same directory as `index.ts`.
2. Run the script:
   ```
   npm run dev
   ```

## Evaluation Process

1. The system reads the content of the project overview document.
2. For each defined section:
   - It searches for the section header using a regex pattern.
   - It extracts the section content.
   - It counts the words and extracts keywords.
   - It checks for required keywords.
   - It calculates a score based on word count (50%) and keyword presence (50%).
3. It calculates an overall score for the document, including a bonus for meeting the overall word count requirement.
4. It generates a detailed report with scores, feedback, and missing keywords.

## Output

The system generates two outputs:
1. A text file named `evaluation_report.txt` in the same directory as the input document.
2. A console log of the same report for immediate feedback.

The report includes:
- Overall score
- Total word count
- Scores for each section
- Detailed feedback for each section
- List of missing keywords for each section

## Customization

To customize the evaluation criteria:
1. Modify the `projectOverviewType` object in `index.ts`.
2. Add, remove, or modify sections as needed.
3. Adjust the required keywords and minimum word counts for each section.
4. Change the overall minimum word count if necessary.

## Error Handling

The system includes basic error handling to catch and report issues during file reading or evaluation.

## Limitations and Potential Improvements

- The system is sensitive to exact section header formatting.
- It does not account for synonyms or context when checking for keywords.
- The scoring system is relatively simple and could be made more sophisticated.
- There's no provision for evaluating the quality or relevance of the content beyond word count and keyword presence.
