const problems = () => {
    [
        {
            id: "1",
            title: "Find the Missing Number",
            description: "Given an array of integers from 1 to n with one missing number (e.g., [1, 2, 3, 4, 6]), write a function to find the missing number.",
            expectedOutput: "5"  // In this case, 5 is missing.
        },
        {
            id: "2",
            title: "Reverse a String",
            description: "Write a function that takes the string 'code' as input and returns the string reversed.",
            expectedOutput: "edoc"  // Reversed string.
        },
        {
            id: "3",
            title: "Find the Largest Element",
            description: "Given an array of numbers [10, 54, 23, 99, 32], write a function to return the largest number in the array.",
            expectedOutput: "99"  // Largest number is 99.
        },
        {
            id: "4",
            title: "Check for Palindrome",
            description: "Write a function to check if the string 'madam' is a palindrome (reads the same forwards and backwards).",
            expectedOutput: "true"  // 'madam' is a palindrome.
        },
        {
            id: "5",
            title: "Find the First Non-Repeated Character",
            description: "Given the string 'aabbcdc', write a function to find the first non-repeated character.",
            expectedOutput: "c"  // 'c' is the first character that is not repeated.
        },
        {
            id: "6",
            title: "Merge Two Sorted Arrays",
            description: "Given two sorted arrays [1, 3, 5] and [2, 4, 6], write a function to merge them into one sorted array.",
            expectedOutput: "[1, 2, 3, 4, 5, 6]"  // Merged sorted array.
        },
        {
            id: "7",
            title: "Find the Majority Element",
            description: "Given an array [3, 3, 4, 2, 3, 3], write a function to find the element that appears more than n/2 times.",
            expectedOutput: "3"  // '3' appears more than n/2 times.
        },
        {
            id: "8",
            title: "Find Duplicates in Array",
            description: "Given an array [1, 2, 2, 3, 4, 4], write a function to find all the duplicates.",
            expectedOutput: "[2, 4]"  // Duplicates are 2 and 4.
        },
        {
            id: "9",
            title: "Find the Kth Largest Element",
            description: "Given an array [1, 3, 5, 6, 2, 4] and k=2, write a function to find the 2nd largest element.",
            expectedOutput: "5"  // 5 is the 2nd largest element.
        },
        {
            id: "10",
            title: "Implement Binary Search",
            description: "Given a sorted array [1, 2, 3, 4, 5, 6] and target = 4, implement binary search to find the target.",
            expectedOutput: "Found at index 3"  // Binary search finds 4 at index 3.
        }
    ]
};

export default problems