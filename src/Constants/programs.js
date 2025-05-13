const programs = [
    {
        title: "Manipulating Arrays",
        content:"start\nlabel tab 10\nmov IDR,0\nmov R1,0\nloop1:\nmov IDR*+tab,R1\nADD R1,2\nmov R1,ACC\nADD IDR,2\nmov IDR,ACC\nSUB IDR,20\nBNE loop1\nend"
    },
    {
        title: "Fibonacci",
        content:"start\nmov r1, 1 //first term\nmov r2, 1 //second term\nmov r3, 0 //result\nmov r4, 5 //counter\n\n//program\nloop2:\nadd r1, r2 //sum first and second terms\nmov r3, acc //move result to r3\nmov r1, r2 //second term becomes first\nmov r2, r3 //result becomes second term\nsub r4, 1 //decrement the counter\nmov r4, acc //move the value to r4\nbne loop2 //loop to instruction @16 if counter not null\nend"
    },
    {
        title: "Factorial",
        content:"start\nmov r1, 4 //n\nmov r2, 1 //result\n\n//program\nloop3:\nmul r1, r2 //multiply n to result\nmov r2, acc //move the result to r2\nsub r1, 1 //decrement n by 1\nmov r1, acc //move the result to r1\nbne loop3 //move to instruction @ if n not null\nend"
    },
    {
        title: "Example 4",
        content:"start\nmov r1, 10\nmov r2, 20\nadd r1,r2\nend"
    },
    {
        title: "Example 5",
        content:"start\nmov r3, 55\nend"
    },
]

export default programs;