# JavaScript ES6  
## Spread Operator – Rest Parameter – Destructuring

---

## 1. Giới thiệu chung

Từ ES6 (ECMAScript 2015), JavaScript cung cấp nhiều cú pháp mới giúp:
- Code ngắn gọn hơn
- Dễ đọc, dễ bảo trì
- Phù hợp với lập trình hiện đại (Frontend, Backend, Fullstack)

Ba khái niệm **bắt buộc phải nắm** là:
- Spread Operator
- Rest Parameter
- Destructuring

---

## 2. Spread Operator (`...`)

### 2.1 Khái niệm

**Spread Operator (`...`)** dùng để  
**trải các phần tử của mảng hoặc object ra bên ngoài**.

Cú pháp:
```js
[...array]
{...object}
2.2 Mục đích sử dụng

Sao chép mảng hoặc object

Gộp nhiều mảng hoặc object

Truyền danh sách phần tử vào hàm

Tránh thay đổi dữ liệu gốc (immutability)

2.3 Ví dụ với Array
<script>
const arr1 = [1, 2, 3];
const arr2 = [...arr1];

arr2.push(4);

console.log(arr1); // [1, 2, 3]
console.log(arr2); // [1, 2, 3, 4]
</script>


Giải thích:

arr2 là bản sao của arr1

Thay đổi arr2 không ảnh hưởng arr1

2.4 Gộp Array
<script>
const a = [1, 2];
const b = [3, 4];

const c = [...a, ...b];
console.log(c); // [1,2,3,4]
</script>

2.5 Ví dụ với Object
<script>
const user = { name: "A" };
const info = { age: 20 };

const fullUser = { ...user, ...info };
console.log(fullUser);
</script>


Lưu ý:

Nếu trùng key → object phía sau ghi đè

3. Rest Parameter (...)
3.1 Khái niệm

Rest Parameter (...) dùng để
gom nhiều giá trị lại thành một mảng.

Cú pháp:

function fn(...args) {}

3.2 Mục đích sử dụng

Nhận số lượng tham số không xác định

Viết hàm linh hoạt

Giảm số lượng overload function

3.3 Ví dụ Rest Parameter trong Function
<script>
function sum(...numbers) {
  let total = 0;
  for (let n of numbers) {
    total += n;
  }
  return total;
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(5, 10));   // 15
</script>

3.4 Quy tắc quan trọng
function fn(a, ...rest, b) {} // ❌ Sai


✔ Rest parameter phải đứng cuối danh sách tham số

4. Destructuring
4.1 Khái niệm

Destructuring cho phép
bóc tách dữ liệu từ mảng hoặc object ra biến riêng lẻ.

4.2 Destructuring Array

Cú pháp:

const [a, b] = array;


Ví dụ:

<script>
const colors = ["red", "green", "blue"];

const [first, second] = colors;
console.log(first);  // red
console.log(second); // green
</script>

4.3 Bỏ qua phần tử
<script>
const numbers = [1, 2, 3];

const [, , last] = numbers;
console.log(last); // 3
</script>

4.4 Destructuring Object

Cú pháp:

const { key } = object;


Ví dụ:

<script>
const user = {
  name: "A",
  age: 20
};

const { name, age } = user;
console.log(name, age);
</script>

4.5 Đổi tên biến
<script>
const user = { name: "A" };

const { name: username } = user;
console.log(username);
</script>

4.6 Giá trị mặc định
<script>
const user = { name: "A" };

const { role = "USER" } = user;
console.log(role);
</script>

4.7 Destructuring trong Function
<script>
function printUser({ name, age }) {
  console.log(name, age);
}

printUser({ name: "A", age: 20 });
</script>


Ứng dụng rất phổ biến trong:

React props

API request / response

Node.js backend

5. Kết hợp Spread + Rest + Destructuring
<script>
const numbers = [1, 2, 3, 4];

const [first, ...rest] = numbers;
const newArr = [...rest, 5];

console.log(first);  // 1
console.log(newArr); // [2,3,4,5]
</script>

6. So sánh nhanh
Kỹ thuật	Ý nghĩa
Spread	Trải dữ liệu ra
Rest	Gom dữ liệu lại
Destructuring	Bóc dữ liệu
7. Kết luận

Spread giúp sao chép và gộp dữ liệu an toàn

Rest giúp xử lý tham số linh hoạt

Destructuring giúp code gọn, rõ nghĩa

Ba kỹ thuật này là nền tảng của JavaScript hiện đại, xuất hiện liên tục trong:

React

Node.js

ES6+ codebase