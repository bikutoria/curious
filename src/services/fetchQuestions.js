import Papa from 'papaparse';

export const fetchQuestions = async () => {
    const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vThlufD53OB4H6kP-lA0SyxHdfFwDUjK6c9fRcA_HaWOY03Ghd5uu_TbvK_8CcKL5DOQ3gUZI6sHfq7/pub?output=csv";

    try {
        const response = await fetch(csvUrl);
        const csvText = await response.text();
        const result = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
        });

        // Map each row to an object containing the ID, question Text, and Familiarity
        // Replace 'ID', 'Text', and 'Familiarity' with actual column names from your CSV
        const questions = result.data.map(row => ({
            id: row.ID,
            text: row.Text,
            familiarity: row.Familiarity
        }));

        return questions;
    } catch (error) {
        console.error("Failed to fetch questions:", error);
        return [];
    }
};
