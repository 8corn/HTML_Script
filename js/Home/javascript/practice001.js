/**
 * Prototype 
 */
const testObj = {};

console.log(testObj.__proto__);             // 출력 -> [Object: null prototype] {}
// __proto__ 는 모든 객체에 존재하는 프로퍼티이다.
// class 강의에서 배울때 상속에서 부모 클래스에 해당하는 값이다.
// but 이것이 object에서 실행되는 이유는 class 또란 object로 instance 되기 때문에

function IdolModel(name, year) {
    this.name = name;
    this.year = year;
}

console.log(IdolModel.prototype);           // 출력 -> {}
console.dir(IdolModel.prototype, {
    showHidden: true,
})
/**
 * 16열에서 숨겨져 있는 값을 확인하는 코드 -> 17열
 * 출력 -> 
 * <ref *1> {
    [constructor]: [Function: IdolModel] {
        [length]: 2,
        [name]: 'IdolModel',
        [arguments]: null,
        [caller]: null,
        [prototype]: [Circular *1]
    }
    } -> 실제로 값이 있음
 */

// circular reference -> 서로가 서로를 참조하고 있는 상태
console.log(IdolModel.prototype.constructor === IdolModel);                     // true
console.log(IdolModel.prototype.constructor.prototype === IdolModel.prototype)  // true

const yuJin = new IdolModel('안유진', 2003);

console.log(yuJin.__proto__);                               // {}
console.log(yuJin.__proto__ === IdolModel.prototype);       // true -> 부모클래스가 IdolModel.prototype이다.

console.log(testObj.__proto__ === Object.prototype);        // true -> testObj는 아무 프로퍼티도 없는 객체이지만 자동으로 부모로 Object의 프로퍼티로 들어감.

console.log(IdolModel.__proto__ === Function.prototype);    // true -> 함수의 프로토타입과 동일
console.log(Function.prototype.__proto__ === Object.prototype); // true 
console.log(IdolModel.prototype.__proto__ === Object.prototype) // true -> IdolModel의 프로토타입은 결국 최상위 개체가 Object프로토타입이 됨

console.log(yuJin.toString());                  // [object Object] -> 보이진 않지만 toString()이라는 함수가 존재한다는 뜻
console.log(Object.prototype.toString());       // [object Object] -> 역시 존재함

// prototype chain -> 모두 연결되어있음 -> 부모클래스 자식클래스간의 연결

function IdolModel2(name, year) {
    this.name = name;
    this.year = year;

    this.sayHello = function() {
        return `${this.name}이 인사를 합니다.`;
    }
}

const yuJin2 = new IdolModel2('안유진', 2003);
const wonYoung2 = new IdolModel2('장원영', 2002);

console.log(yuJin2.sayHello());                         // 안유진이 인사를 합니다.
console.log(wonYoung2.sayHello());                      // 장원영이 인사를 합니다.
console.log(yuJin2.sayHello === wonYoung2.sayHello);    // false -> 같은 기능의 sayHello이지만 다른 메모리 공간을 사용 -> 메모리 낭비 (중복 저장)
// 위 false를 증명
console.log(yuJin2.hasOwnProperty('sayHello'));         // true -> sayHello(프로퍼티 이름)는 yuJin2 만의 고유 프로퍼티라는 뜻으로 상속 받지 않았다는 뜻
// hasOwnProperty -> true면 실제 yuJin3에 선언되어있는 값, false면 상속받은 값
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

// sayHello 프로퍼티가 yuJin2와 wonYoung2를 공유하게 만드는 방법
function IdolModel3(name, year) {
    this.name = name;
    this.year = year;
}
// 프로토타입은 프로토가 가져가는 객체 -> 상속받는 부모의 역할을 함
IdolModel3.prototype.sayHello = function() {  // 이 함수를 정의를 할 때 IdolModel3 안에 쓴 것처럼 써도 됨 -> 실제로 쓴 것이기 때문 (this.name같은 것)
    return `${this.name}이 인사를 합니다.`;
}

const yuJin3 = new IdolModel3('안유진', 2003);
const wonYoung3 = new IdolModel3('장원영', 2003);

console.log(yuJin3.sayHello());             // 안유진이 인사를 합니다.
console.log(wonYoung3.sayHello());          // 장원영이 인사를 합니다.

console.log(yuJin3.sayHello === wonYoung3.sayHello);    // true (!= 68열) -> 같은 메모리 한 공간에 저장되었다는 뜻 (메모리 절약)
console.log(yuJin3.hasOwnProperty('sayHello'));         // false -> 부모클래스에서 상속 받았다는 뜻 -> 효율적으로 사용함
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

// static으로 선언하는 방법 -> instance에는 존재하지 않음
IdolModel3.sayStaticHello = function() {        // 객체이기 때문에 그냥 선언하면 됨
    return '안녕하세요 저는 static method 입니다.';
}
console.log(IdolModel3.sayStaticHello());   // 안녕하세요 저는 static method 입니다.
// Overriding
function IdolModel4(name,year) {
    this.name = name;
    this.year = year;

    this.sayHello = function() {
        return '안녕하세요 저는 instance 메서드 입니다.'
    }
}
IdolModel4.prototype.sayHello = function() {
    return '안녕하세요 저는 protorype 메서드입니다.';
}
const yuJin4 = new IdolModel4('안유진', 2003);
console.log(yuJin4.sayHello());     // 안녕하세요 저는 instance 메서드 입니다. -> prototype 메스드를 인스턴스 메서드로 덮어쓰기 가능하다는 뜻
// 147열이 없을때 -> 안녕하세요 저는 protorype 메서드입니다. -> prototype을 상속 받기 때문에 가능
// 프로퍼티 셰도잉 -> class에서 override와 같음
/**
 * getPrototypeOf, setPrototypeOf
 * 
 * 인스턴스의 __proto__ 변경 vs 함수의 prototype 변경
 */
function IdolModel(name, year) {
    this.name = name;
    this.year = year;
}
IdolModel.prototype.sayHello = function() {
    return `${this.name}이 인사를 합니다.`;
}
function FemaleIdolModel(name, year) {
    this.name = name;
    this.year = year;

    this.dance = function() {
        return `${this.name}이 춤을 춥니다.`;
    }
}
const gaEul = new IdolModel('가을', 2004);
const ray = new FemaleIdolModel('레이', 2004);

console.log(gaEul.__proto__);                           // { sayHello: [Function (anonymous)] }
console.log(gaEul.__proto__ === IdolModel.prototype);   // true
console.log(Object.getPrototypeOf(gaEul) === IdolModel.prototype);  // true -> gaEul.__proto__ === Object.getPrototypeOf(gaEul)

console.log(gaEul.sayHello());                          // 가을이 인사를 합니다.
console.log(ray.dance());                               // 레이이 춤을 춥니다.
// console.log(ray.sayHello());                         // error -> sayHello가 어디에도 정의되지 않음

// IdolModel의 prototype을 gaEul에 상속받는 방법
console.log(Object.getPrototypeOf(ray) === FemaleIdolModel.prototype)   // true

Object.setPrototypeOf(ray, IdolModel.prototype);        // true -> 상속 대상을 prototype으로 바꿈
console.log(ray.sayHello());                            // 레이이 인사를 합니다. -> 바뀜

console.log(ray.constructor === FemaleIdolModel);       // false -> proto를 바꿨기 때문에 false
console.log(ray.constructor === IdolModel);             // true
console.log(gaEul.constructor === IdolModel);           // true
// 원래는 생성자 함수를 통해 객체를 생성을 했을 때 생성을 한 대상 함수가 constructor 값이 되지만
// proto를 변경을 하니 상속받은 constructor property도 그대로 상속되어 constructor가 아얘 변경됨
console.log(Object.getPrototypeOf(ray) === FemaleIdolModel.prototype);  // false -> 194열과 변경됨
console.log(Object.getPrototypeOf(ray) === IdolModel.prototype);         // true
console.log(FemaleIdolModel.prototype === IdolModel.prototype);         // false
// FemaleIdolModel의 프로토타입은 유지되지만 FemaleIdolModel과 ray 객체의 연결만 끊김

FemaleIdolModel.prototype = IdolModel.prototype;        
const eSeo = new FemaleIdolModel('이서', 2007);
console.log(Object.getPrototypeOf(eSeo) === FemaleIdolModel.prototype); // true -> FemaleIdolModel로 선언하였기 때문
// 209열에서 프로토타입을 변경을 했지만 Female..의 프로토타입이 eseo의 프로토타입과 같은 이유가 204열의 ray객체의 프로토를 직접 변경했을 때 Femal..의 프로토타입과 다르다고 나오는 것과 차이가 있음
/** ray가 FemaleIdolModel.prototype을 바라보고 있을때                                 FemaleIdolModel의 prototype을 IdolMoel.prototype으로 바라볼때
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */