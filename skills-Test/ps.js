// task-1
function sqaureEven() {
  const numbers = [1, 2, 3, 4, 5, 6];
  const even = numbers.filter((num) => num % 2 === 0);
  const sqredEven = even.map((num) => num * num);
  return sqredEven;
}

const callSqrEvn = sqaureEven();
// console.log(callSqrEvn);

// task-2
const find18Plus = () => {
  const users = [
    { name: "A", age: 18 },
    { name: "B", age: 12 },
    { name: "C", age: 19 },
  ];

  const eighteenPlus = users.filter((user) => user.age >= 18);
  return eighteenPlus;
};

const call18Plus = find18Plus();
console.log(call18Plus);

// Task 3: Difference Between map, filter, and forEach

// In JavaScript, map, filter, and forEach are commonly used array methods, but they serve different purposes.

// map()
// // The map() method is used to transform each element of an array. It returns a new array where every item is modified based on the provided function.
// filter()
// // The filter() method is used to select elements from an array based on a condition. It returns a new array containing only the elements that satisfy the condition.
// forEach()
// // The forEach() method is used to iterate over an array when performing side effects, such as logging or updating values. It does not return a new array.
const num = [1, 2, 3, 4, 5];
const printing = num.forEach((n) => console.log(n * 3)); // its just printing. nothing returned from it.
