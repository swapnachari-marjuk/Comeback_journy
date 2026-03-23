let numbers = [1, 2, 3, 4, 5, 6] 

let even = numbers.filter(num=> num%2 ===0)
let sqredEven = even.map(num => num*2)

console.log(sqredEven)