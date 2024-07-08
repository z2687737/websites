//www/js/issueTypeOptions.js

// Function to show specific options based on the selected issue type
function showIssueOptions() {
    const issueType = document.getElementById("issueType").value;
    document.getElementById("trackConditionOptions").style.display = issueType === "trackCondition" ? "block" : "none";
    document.getElementById("trackMarkingOptions").style.display = issueType === "trackMarking" ? "block" : "none";
    document.getElementById("inappropriateUseOptions").style.display = issueType === "inappropriateUse" ? "block" : "none";
    document.getElementById("otherIssuesOptions").style.display = issueType === "otherIssues" ? "block" : "none";
}

// Ensure the function is available when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("issueType").addEventListener("change", showIssueOptions);
});
