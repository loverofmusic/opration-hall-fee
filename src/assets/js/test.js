function test() {
  console.log([...arguments]);
}
test(1, 4, 6);

function factorial(num) {
  // if (num == 1) {
  //   return 1;
  // } else {
  //   return num * factorial(num - 1);
  // }
  return num == 1 ? 1 : num * factorial(--num);
}
factorial(5);

function writeStar(num) {
  // if (num == 0) {
  //   return "";
  // }
  // ("*".repeat(num));
  // writeStar(--num);
  return num ? console.log("*".repeat(num)) || writeStar(--num) : "";
}
writeStar(8);

(function(window) {
  // var testfunc = function() {
  //   console.log(3);
  // };
  // window.ttt = {testfunc};

  // function testfunc() {
  //   console.log(3);
  // }
  // window.ttt = { testfunc };
  var obj = {
    some: "dddd",
    funct: function() {
      console.log(5);
    }
  };
  window.obj = obj;
})(window);
obj.funct();

var arr = [3, 5, 6];
let arrnew = arr.map(item => {
  item += 2;
  return item;
});
console.table(arrnew);

var arr2 = [3, 5, 6];
arr2.map((item, index, array) => {
  array[index] += 2;
});
console.table(arr2);


