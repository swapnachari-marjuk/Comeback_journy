// task-1
function squareEven() {
  const numbers = [1, 2, 3, 4, 5, 6];
  const even = numbers.filter((num) => num % 2 === 0);
  const squaredEven = even.map((num) => num * num);
  return squaredEven;
}

const callSqrEvn = squareEven();
// console.log(callSqrEvn);

// task-2
const find18Plus = () => {
  const users = [
    { name: "A", age: 19 },
    { name: "B", age: 23 },
    { name: "C", age: 18 },
  ];

  const eighteenPlus = users
    .filter((user) => user.age >= 18)
    .map((user) => ({ ...user, isVerified: true }))
    .sort((a, b) => a.age - b.age);

  return eighteenPlus;
};

const call18Plus = find18Plus();
// console.log(call18Plus);

// task-4
const user = {
  name: "Gemini User",
  age: 30,
  email: "randomuser@gmail.com",
  address: {
    houseNo: "23h",
    aria: "Mirpur DSH",
    dist: "Dhaka",
    city: "Dhaka",
  },
};
function updateUser(user, updatedCity) {
  const updatedUser = {
    // shallow copy korle reference error dekha dite pare.
    ...user,
    address: {
      ...user.address,
      city: updatedCity,
    },
  };

  //   console.log(updatedUser);
}

const callUpdateUser = updateUser(user, "CTG");
console.log(callUpdateUser);

// task-5
let loading = false;
const fetchingData = async () => {
  try {
    loading = true;
    if (loading) {
      console.log("loading...");
    }

    const res = await fetch("https://jsonplaceholder.typicode.co/users");
    if (!res.ok) {
      throw new Error("failed to data fetch!"); // এটি সরাসরি catch-এ পাঠিয়ে দিবে
    }

    console.log(res);
  } catch (error) {
    console.log(error.message, "from catch");
  } finally {
    loading = false;

    if (!loading) {
      console.log("operation end");
    }
  }
};

// fetchingData();

// closure from gemini
const randFunc = () => {
  let num = 0; // এটি বাইরের ভেরিয়েবল (ম্যাজিক বক্সের চিরকুট)

  function innerFunc() {
    num = num + 1; // আমরা 'num' কে আপডেট করছি, নতুন ভেরিয়েবল নিচ্ছি না
    console.log(num);
  }

  // আমরা পুরো ফাংশনটাকেই রিটার্ন করে দিচ্ছি
  return innerFunc;
};

const callRandFunc = randFunc();
// এখানে 'callRandFunc' এখন একটি ক্লোজার।
// সে 'num' ভেরিয়েবলটাকে তার মেমোরিতে আটকে (Close) রেখেছে।

// callRandFunc(); // আউটপুট: 1 (0 + 1)
// callRandFunc(); // আউটপুট: 2 (1 + 1)
// callRandFunc(); // আউটপুট: 3 (2 + 1)

// task 6

const cartSystem = () => {
  let cartItems = 0;

  const addItem = () => {
    cartItems += 1;
    console.log(cartItems);
  };

  return addItem;
};

const callCartSystem = cartSystem();
callCartSystem();
callCartSystem();
callCartSystem();

// Task 3: Difference Between map, filter, and forEach

// In JavaScript, map, filter, and forEach are commonly used array methods, but they serve different purposes.

// map()
// // The map() method is used to transform each element of an array. It returns a new array where every item is modified based on the provided function.
// filter()
// // The filter() method is used to select elements from an array based on a condition. It returns a new array containing only the elements that satisfy the condition.
// forEach()
// // The forEach() method is used to iterate over an array when performing side effects, such as logging or updating values. It does not return a new array.

// const num = [1, 2, 3, 4, 5];
// const printing = num.forEach((n) => console.log(n * 3));
// its just printing. nothing returned from it.
