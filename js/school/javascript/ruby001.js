/**
 * 루비 (Ruby)
 * 장점 - 쉽고 가벼운 느낌
 * 
 * 단점 - 속도가 느리고 국내 사용률이 저조하다. -> 한국에서 많이 사용을 하지 않아서 자료 찾기가 어렵다.
 * 
 * MVC패턴 -> Model - View - Controller
 * 데이터, 운영 로직, 인터페이스에 대한 개발을 용이하게 개발
 * * Don't repeat my self - 절대 반복하지 마라
 * 
 * Rails는 Ruby에서 사용하는 프레임워크이다.
 * 
 * Ruby on Rails 특징
 * - Scaffold 지원
 * - 웹서버에서 태스트 가능
 * 
 * RESTful Web services
 * - REST = REpresentational State Transfer
 * - URI와 HTTO 메소드를 이용해 객체화된 서비스에 접근하는 것
 * - 무상태(stateless) : 각 요청 간 클라이언트의 콘텍스트가 서버에 저장되어선 안된다.
 * -Code on demand(optional) : 자바 애플릿, 자바스크립트 제공
 * URL : uniform resource locator
 * URI : uniform resource idenfifier
 * 
 * GET : Get a resource
 * POST : Create a resource
 * PUT : Update a resource
 * DELETE : Delete a resource
 * 
 * : 이 붙어있으면 변수 ex) /api/users/:user_id
 * 
 * gem : 라이브러리 -> 필요한 자료를 찾아서 사용하면 됨
 * 
 * ** routes는 무조건 Controller와 연결이 되어 있음.
 * -> Controller가 Model로 가야할 지 안갈지 선택을 함
 * -> 이 정보를 View랑... 조율을 함
 * 
 * - Model은 각각의 객체를 저장하지만 Controller는 극 객체를 모아둔 페이지이므로 복수형으로 적는다 ex) student.rb -> studentsController.rb
 * - Model에서 만든 객체를 View에서 불러서 사용하려면 @가 필요하다 ex) @students = Student.all -> views > students
 * -> ********* 단수 복수를 중요하게 여기기 -> 단수형으로 만들어야하고 복수형으로 바뀌는 것은 자동으로 바뀜 ******
 * -> Student.find(2) -> 2라는 id를 가진 객체를 가져와라는 뜻
 * 
 */