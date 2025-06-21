// Korean Conversation Practice App
class KoreanConversationApp {
    constructor() {
        this.currentStep = 1;
        this.selectedScenario = null;
        this.selectedRole = null;
        this.currentDialogueIndex = 0;
        this.practiceDialogues = [];
        this.userResponses = [];
        this.vocabularyProgress = [];
        this.speakingProgress = [];
        this.comicData = [];
        this.animationTimer = null;
        this.recognition = null;
        this.isRecording = false;
        this.currentSpeechIndex = 0;
        
        this.initializeData();
        this.initializeApp();
    }

    initializeData() {
        this.scenarios = {
            restaurant: {
                name: "식당",
                icon: "🍽️",
                dialogues: [
                    {role: "A", text: "어서 오세요! 몇 분이세요?", translation: "Welcome! How many people?"},
                    {role: "B", text: "두 명이요.", translation: "Two people."},
                    {role: "A", text: "이쪽 자리로 안내해드릴게요.", translation: "I'll guide you to this table."},
                    {role: "B", text: "메뉴 좀 보여주세요.", translation: "Please show me the menu."},
                    {role: "A", text: "네, 여기 메뉴입니다.", translation: "Yes, here's the menu."},
                    {role: "B", text: "김치찌개 하나 주세요.", translation: "One kimchi stew, please."},
                    {role: "A", text: "음료는 어떻게 하시겠어요?", translation: "What would you like to drink?"},
                    {role: "B", text: "물 한 잔 주세요.", translation: "One glass of water, please."}
                ],
                vocabulary: [
                    {word: "메뉴", meaning: "음식점에서 제공하는 음식의 목록", example: "메뉴를 보여주세요."},
                    {word: "주문", meaning: "원하는 음식을 시키는 것", example: "주문하시겠어요?"},
                    {word: "계산", meaning: "음식값을 지불하는 것", example: "계산해 주세요."},
                    {word: "음료", meaning: "마시는 것", example: "음료는 뭘 드시겠어요?"},
                    {word: "자리", meaning: "앉는 곳", example: "빈 자리가 있나요?"}
                ],
                practice: [
                    "이 메뉴로 주문할게요.",
                    "맛있게 잘 먹었습니다.",
                    "계산서 좀 주세요.",
                    "포장 가능한가요?",
                    "추천 메뉴가 뭐예요?",
                    "매운 거 안 되는데요.",
                    "카드로 계산할게요."
                ]
            },
            cafe: {
                name: "카페",
                icon: "☕",
                dialogues: [
                    {role: "A", text: "어서 오세요! 주문하시겠어요?", translation: "Welcome! Would you like to order?"},
                    {role: "B", text: "아메리카노 한 잔 주세요.", translation: "One americano, please."},
                    {role: "A", text: "아이스로 드릴까요, 핫으로 드릴까요?", translation: "Would you like it iced or hot?"},
                    {role: "B", text: "아이스로 주세요.", translation: "Iced, please."},
                    {role: "A", text: "사이즈는 어떻게 하시겠어요?", translation: "What size would you like?"},
                    {role: "B", text: "라지 사이즈로 주세요.", translation: "Large size, please."},
                    {role: "A", text: "매장에서 드시나요, 포장하시나요?", translation: "For here or to go?"},
                    {role: "B", text: "포장해 주세요.", translation: "To go, please."}
                ],
                vocabulary: [
                    {word: "아메리카노", meaning: "에스프레소에 뜨거운 물을 넣은 커피", example: "아메리카노 한 잔 주세요."},
                    {word: "사이즈", meaning: "크기", example: "사이즈는 어떻게 하시겠어요?"},
                    {word: "포장", meaning: "가져가기 위해 싸는 것", example: "포장해 주세요."},
                    {word: "매장", meaning: "가게 안", example: "매장에서 드시나요?"},
                    {word: "라지", meaning: "큰 크기", example: "라지 사이즈로 주세요."}
                ],
                practice: [
                    "테이크아웃으로 주세요.",
                    "디카페인 있나요?",
                    "설탕 빼주세요.",
                    "케이크도 하나 주세요.",
                    "와이파이 비밀번호가 뭐예요?",
                    "화장실이 어디예요?",
                    "영수증 주세요."
                ]
            },
            cosmetic: {
                name: "화장품가게",
                icon: "💄",
                dialogues: [
                    {role: "A", text: "어서 오세요! 찾으시는 제품이 있나요?", translation: "Welcome! Are you looking for any specific product?"},
                    {role: "B", text: "립스틱 좀 보고 싶어요.", translation: "I'd like to look at lipsticks."},
                    {role: "A", text: "어떤 색상을 원하세요?", translation: "What color would you like?"},
                    {role: "B", text: "빨간색 계열로 보여주세요.", translation: "Please show me red tones."},
                    {role: "A", text: "이 색상 어떠세요? 테스트해보실 수 있어요.", translation: "How about this color? You can test it."},
                    {role: "B", text: "네, 테스트해볼게요.", translation: "Yes, I'll test it."},
                    {role: "A", text: "잘 어울리시네요!", translation: "It looks great on you!"},
                    {role: "B", text: "이걸로 하겠습니다.", translation: "I'll take this one."}
                ],
                vocabulary: [
                    {word: "립스틱", meaning: "입술에 바르는 화장품", example: "립스틱 좀 보고 싶어요."},
                    {word: "색상", meaning: "색깔", example: "어떤 색상을 원하세요?"},
                    {word: "테스트", meaning: "시험해보는 것", example: "테스트해보실 수 있어요."},
                    {word: "어울리다", meaning: "잘 맞다", example: "잘 어울리시네요!"},
                    {word: "계열", meaning: "비슷한 종류", example: "빨간색 계열로 보여주세요."}
                ],
                practice: [
                    "이 색깔 어때요?",
                    "피부 타입이 어떻게 되세요?",
                    "민감성 피부용 있나요?",
                    "가격이 어떻게 되나요?",
                    "다른 색상도 보여주세요.",
                    "샘플 받을 수 있나요?",
                    "포장해 주세요."
                ]
            },
            clothing: {
                name: "옷가게",
                icon: "👔",
                dialogues: [
                    {role: "A", text: "어서 오세요! 무엇을 도와드릴까요?", translation: "Welcome! How can I help you?"},
                    {role: "B", text: "셔츠 좀 보고 싶어요.", translation: "I'd like to look at shirts."},
                    {role: "A", text: "어떤 사이즈를 찾으세요?", translation: "What size are you looking for?"},
                    {role: "B", text: "미디움 사이즈요.", translation: "Medium size."},
                    {role: "A", text: "이 셔츠 어떠세요?", translation: "How about this shirt?"},
                    {role: "B", text: "입어봐도 될까요?", translation: "May I try it on?"},
                    {role: "A", text: "네, 피팅룸이 저쪽에 있어요.", translation: "Yes, the fitting room is over there."},
                    {role: "B", text: "잘 맞네요. 이걸로 할게요.", translation: "It fits well. I'll take this one."}
                ],
                vocabulary: [
                    {word: "셔츠", meaning: "상의", example: "셔츠 좀 보고 싶어요."},
                    {word: "사이즈", meaning: "크기", example: "어떤 사이즈를 찾으세요?"},
                    {word: "피팅룸", meaning: "옷을 입어보는 곳", example: "피팅룸이 저쪽에 있어요."},
                    {word: "맞다", meaning: "크기가 적당하다", example: "잘 맞네요."},
                    {word: "입어보다", meaning: "옷을 시험해 입다", example: "입어봐도 될까요?"}
                ],
                practice: [
                    "다른 색깔도 있나요?",
                    "라지 사이즈는 없나요?",
                    "할인하는 상품 있나요?",
                    "교환 가능한가요?",
                    "이 바지 어때요?",
                    "신용카드 되나요?",
                    "영수증 주세요."
                ]
            },
            convenience: {
                name: "편의점",
                icon: "🏪",
                dialogues: [
                    {role: "A", text: "어서 오세요!", translation: "Welcome!"},
                    {role: "B", text: "물 하나랑 과자 하나 주세요.", translation: "One water and one snack, please."},
                    {role: "A", text: "네, 또 필요한 건 없으세요?", translation: "Yes, do you need anything else?"},
                    {role: "B", text: "담배 한 갑도 주세요.", translation: "One pack of cigarettes too, please."},
                    {role: "A", text: "신분증 확인 부탁드려요.", translation: "Please show me your ID."},
                    {role: "B", text: "여기 있어요.", translation: "Here it is."},
                    {role: "A", text: "총 8,000원입니다.", translation: "That's 8,000 won in total."},
                    {role: "B", text: "카드로 계산할게요.", translation: "I'll pay by card."}
                ],
                vocabulary: [
                    {word: "과자", meaning: "간식", example: "과자 하나 주세요."},
                    {word: "담배", meaning: "피우는 것", example: "담배 한 갑 주세요."},
                    {word: "신분증", meaning: "신원을 확인하는 증명서", example: "신분증 확인 부탁드려요."},
                    {word: "계산", meaning: "돈을 지불하는 것", example: "카드로 계산할게요."},
                    {word: "갑", meaning: "담배의 단위", example: "담배 한 갑 주세요."}
                ],
                practice: [
                    "봉지 주세요.",
                    "현금으로 할게요.",
                    "잔돈 주세요.",
                    "영수증 필요 없어요.",
                    "이거 얼마예요?",
                    "할인카드 있어요.",
                    "포인트 적립해 주세요."
                ]
            },
            library: {
                name: "도서관",
                icon: "📚",
                dialogues: [
                    {role: "A", text: "도서관에 오신 것을 환영합니다.", translation: "Welcome to the library."},
                    {role: "B", text: "책을 대출하고 싶어요.", translation: "I'd like to borrow books."},
                    {role: "A", text: "도서관 회원카드 있으세요?", translation: "Do you have a library card?"},
                    {role: "B", text: "네, 여기 있어요.", translation: "Yes, here it is."},
                    {role: "A", text: "어떤 책을 찾으세요?", translation: "What books are you looking for?"},
                    {role: "B", text: "한국 역사에 관한 책이요.", translation: "Books about Korean history."},
                    {role: "A", text: "3층 역사 코너에 있습니다.", translation: "They're in the history section on the 3rd floor."},
                    {role: "B", text: "감사합니다.", translation: "Thank you."}
                ],
                vocabulary: [
                    {word: "대출", meaning: "책을 빌리는 것", example: "책을 대출하고 싶어요."},
                    {word: "회원카드", meaning: "회원임을 증명하는 카드", example: "도서관 회원카드 있으세요?"},
                    {word: "역사", meaning: "과거에 일어난 일", example: "한국 역사에 관한 책이요."},
                    {word: "코너", meaning: "구역", example: "3층 역사 코너에 있습니다."},
                    {word: "반납", meaning: "빌린 것을 돌려주는 것", example: "책 반납하러 왔어요."}
                ],
                practice: [
                    "연장 가능한가요?",
                    "신간 도서 어디 있나요?",
                    "복사 서비스 되나요?",
                    "열람실 자리 있나요?",
                    "반납일이 언제예요?",
                    "연체료 얼마예요?",
                    "예약 가능한가요?"
                ]
            },
            bookstore: {
                name: "서점",
                icon: "📖",
                dialogues: [
                    {role: "A", text: "어서 오세요! 찾으시는 책이 있나요?", translation: "Welcome! Are you looking for any specific book?"},
                    {role: "B", text: "한국어 교재 있나요?", translation: "Do you have Korean textbooks?"},
                    {role: "A", text: "네, 어학 코너에 있어요.", translation: "Yes, they're in the language section."},
                    {role: "B", text: "초급자용으로 추천해 주세요.", translation: "Please recommend one for beginners."},
                    {role: "A", text: "이 책이 인기가 많아요.", translation: "This book is very popular."},
                    {role: "B", text: "가격이 어떻게 되나요?", translation: "What's the price?"},
                    {role: "A", text: "25,000원입니다.", translation: "It's 25,000 won."},
                    {role: "B", text: "포장해 주세요.", translation: "Please wrap it."}
                ],
                vocabulary: [
                    {word: "교재", meaning: "공부하는 책", example: "한국어 교재 있나요?"},
                    {word: "어학", meaning: "언어 공부", example: "어학 코너에 있어요."},
                    {word: "초급자", meaning: "처음 배우는 사람", example: "초급자용으로 추천해 주세요."},
                    {word: "인기", meaning: "많은 사람이 좋아하는 것", example: "이 책이 인기가 많아요."},
                    {word: "포장", meaning: "싸는 것", example: "포장해 주세요."}
                ],
                practice: [
                    "베스트셀러 뭐가 있나요?",
                    "할인하는 책 있나요?",
                    "온라인 주문 가능한가요?",
                    "배송 되나요?",
                    "중고책도 있나요?",
                    "교환 가능한가요?",
                    "영수증 주세요."
                ]
            },
            schoolFriends: {
                name: "학교(친구들)",
                icon: "👥",
                dialogues: [
                    {role: "A", text: "안녕! 오늘 수업 어땠어?", translation: "Hi! How was class today?"},
                    {role: "B", text: "힘들었어. 수학이 너무 어려워.", translation: "It was hard. Math is too difficult."},
                    {role: "A", text: "나도 그래. 같이 공부할래?", translation: "Me too. Do you want to study together?"},
                    {role: "B", text: "좋아! 도서관에서 만날까?", translation: "Good! Shall we meet at the library?"},
                    {role: "A", text: "몇 시에 만날까?", translation: "What time shall we meet?"},
                    {role: "B", text: "4시 어때?", translation: "How about 4 o'clock?"},
                    {role: "A", text: "좋아, 그럼 나중에 봐!", translation: "Good, see you later!"},
                    {role: "B", text: "응, 나중에 봐!", translation: "Yes, see you later!"}
                ],
                vocabulary: [
                    {word: "수업", meaning: "학교에서 배우는 시간", example: "오늘 수업 어땠어?"},
                    {word: "수학", meaning: "숫자와 계산을 다루는 과목", example: "수학이 너무 어려워."},
                    {word: "공부", meaning: "배우고 익히는 것", example: "같이 공부할래?"},
                    {word: "도서관", meaning: "책을 읽는 곳", example: "도서관에서 만날까?"},
                    {word: "나중에", meaning: "뒤에", example: "나중에 봐!"}
                ],
                practice: [
                    "숙제 했어?",
                    "점심 뭐 먹을까?",
                    "시험 언제야?",
                    "같이 갈래?",
                    "전화번호 좀 알려줘.",
                    "주말에 뭐 해?",
                    "잘 모르겠어."
                ]
            },
            schoolTeacher: {
                name: "학교(선생님)",
                icon: "👨‍🏫",
                dialogues: [
                    {role: "A", text: "안녕하세요, 선생님.", translation: "Hello, teacher."},
                    {role: "B", text: "안녕하세요. 무슨 일이세요?", translation: "Hello. What's the matter?"},
                    {role: "A", text: "수업 내용 중에 질문이 있어요.", translation: "I have a question about the class content."},
                    {role: "B", text: "네, 무엇이 궁금하세요?", translation: "Yes, what are you curious about?"},
                    {role: "A", text: "3페이지 문제를 잘 모르겠어요.", translation: "I don't understand the problem on page 3."},
                    {role: "B", text: "여기 봐요. 이렇게 하면 돼요.", translation: "Look here. You can do it like this."},
                    {role: "A", text: "아, 이제 이해했어요.", translation: "Ah, now I understand."},
                    {role: "B", text: "또 궁금한 것 있으면 언제든 물어보세요.", translation: "If you have any more questions, ask anytime."}
                ],
                vocabulary: [
                    {word: "선생님", meaning: "가르치는 사람", example: "안녕하세요, 선생님."},
                    {word: "질문", meaning: "궁금한 것을 묻는 것", example: "질문이 있어요."},
                    {word: "내용", meaning: "들어있는 것", example: "수업 내용 중에 질문이 있어요."},
                    {word: "문제", meaning: "풀어야 하는 것", example: "3페이지 문제를 잘 모르겠어요."},
                    {word: "이해", meaning: "뜻을 알아차리는 것", example: "이제 이해했어요."}
                ],
                practice: [
                    "설명 좀 다시 해주세요.",
                    "과제 언제까지 내야 해요?",
                    "시험 범위가 어디까지예요?",
                    "결석계 내려고 해요.",
                    "성적 상담 받고 싶어요.",
                    "추천서 써주실 수 있나요?",
                    "감사합니다."
                ]
            },
            schoolExam: {
                name: "학교(시험)",
                icon: "📝",
                dialogues: [
                    {role: "A", text: "다음 주에 시험 있다고 들었어.", translation: "I heard there's an exam next week."},
                    {role: "B", text: "맞아. 중간고사야.", translation: "That's right. It's the midterm exam."},
                    {role: "A", text: "시험 범위가 어디까지야?", translation: "What's the exam scope?"},
                    {role: "B", text: "1장부터 5장까지래.", translation: "From chapter 1 to 5."},
                    {role: "A", text: "같이 공부할까?", translation: "Shall we study together?"},
                    {role: "B", text: "좋아! 언제 만날까?", translation: "Good! When shall we meet?"},
                    {role: "A", text: "내일 오후에 어때?", translation: "How about tomorrow afternoon?"},
                    {role: "B", text: "좋아, 열심히 준비하자!", translation: "Good, let's prepare hard!"}
                ],
                vocabulary: [
                    {word: "시험", meaning: "실력을 확인하는 것", example: "다음 주에 시험 있어."},
                    {word: "중간고사", meaning: "학기 중간에 보는 시험", example: "중간고사야."},
                    {word: "범위", meaning: "정해진 구역", example: "시험 범위가 어디까지야?"},
                    {word: "장", meaning: "책의 단위", example: "1장부터 5장까지래."},
                    {word: "준비", meaning: "미리 갖추는 것", example: "열심히 준비하자!"}
                ],
                practice: [
                    "시험 잘 봤어?",
                    "몇 점 받았어?",
                    "어려웠어?",
                    "복습 같이 하자.",
                    "기출문제 있어?",
                    "공부 방법 알려줘.",
                    "걱정 많이 돼."
                ]
            },
            schoolHomework: {
                name: "학교(숙제)",
                icon: "✏️",
                dialogues: [
                    {role: "A", text: "숙제 다 했어?", translation: "Did you finish your homework?"},
                    {role: "B", text: "아니, 수학 숙제가 너무 어려워.", translation: "No, the math homework is too difficult."},
                    {role: "A", text: "어느 부분이 어려워?", translation: "Which part is difficult?"},
                    {role: "B", text: "방정식 푸는 게 잘 안 돼.", translation: "I can't solve equations well."},
                    {role: "A", text: "같이 해볼까? 내가 도와줄게.", translation: "Shall we do it together? I'll help you."},
                    {role: "B", text: "정말? 고마워!", translation: "Really? Thank you!"},
                    {role: "A", text: "이렇게 하면 돼. 이해했어?", translation: "You do it like this. Do you understand?"},
                    {role: "B", text: "네, 이제 알겠어요. 도움 주셔서 감사해요.", translation: "Yes, now I understand. Thank you for your help."}
                ],
                vocabulary: [
                    {word: "숙제", meaning: "집에서 하는 공부", example: "숙제 다 했어?"},
                    {word: "방정식", meaning: "수학의 한 종류", example: "방정식 푸는 게 잘 안 돼."},
                    {word: "부분", meaning: "전체 중의 일부", example: "어느 부분이 어려워?"},
                    {word: "도움", meaning: "돕는 것", example: "도움 주셔서 감사해요."},
                    {word: "이해", meaning: "뜻을 알아차리는 것", example: "이해했어?"}
                ],
                practice: [
                    "숙제 언제까지 내야 해?",
                    "같이 하자.",
                    "모르는 문제가 있어.",
                    "설명해 줄 수 있어?",
                    "답 좀 확인해 줘.",
                    "시간이 부족해.",
                    "내일까지 끝낼 수 있을까?"
                ]
            }
        };
    }

    initializeApp() {
        this.renderScenarios();
        this.setupEventListeners();
        this.updateProgress(1);
        this.initializeSpeechRecognition();
        this.setupDrawingCanvas();
    }

    setupEventListeners() {
        // Step navigation
        document.getElementById('playAnimation')?.addEventListener('click', () => this.playAnimation());
        document.getElementById('pauseAnimation')?.addEventListener('click', () => this.pauseAnimation());
        document.getElementById('replayAnimation')?.addEventListener('click', () => this.replayAnimation());
        
        // Navigation buttons
        document.getElementById('backToScenarios')?.addEventListener('click', () => this.goToStep(1));
        document.getElementById('goToRoleSelection')?.addEventListener('click', () => this.goToStep(3));
        document.getElementById('backToAnimation')?.addEventListener('click', () => this.goToStep(2));
        document.getElementById('goToConversationPractice')?.addEventListener('click', () => this.goToStep(4));
        document.getElementById('backToRoleSelection')?.addEventListener('click', () => this.goToStep(3));
        document.getElementById('goToVocabulary')?.addEventListener('click', () => this.goToStep(5));
        document.getElementById('backToPractice')?.addEventListener('click', () => this.goToStep(4));
        document.getElementById('goToSpeakingTest')?.addEventListener('click', () => this.goToStep(6));
        document.getElementById('backToVocabulary')?.addEventListener('click', () => this.goToStep(5));
        document.getElementById('goToComicTest')?.addEventListener('click', () => this.goToStep(7));
        document.getElementById('backToSpeaking')?.addEventListener('click', () => this.goToStep(6));
        document.getElementById('completeTest')?.addEventListener('click', () => this.completeTest());
        
        // Practice functionality
        document.getElementById('submitResponse')?.addEventListener('click', () => this.submitResponse());
        document.getElementById('showHint')?.addEventListener('click', () => this.showHint());
        
        // Speaking test
        document.getElementById('startSpeechBtn')?.addEventListener('click', () => this.toggleSpeechRecognition());
        document.getElementById('playSentence')?.addEventListener('click', () => this.playSentence());
        document.getElementById('nextSentenceBtn')?.addEventListener('click', () => this.nextSentence());
        
        // Comic creation
        document.querySelectorAll('.draw-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.toggleDrawing(e.target.dataset.panel));
        });
        
        document.querySelectorAll('.file-input').forEach(input => {
            input.addEventListener('change', (e) => this.handleFileUpload(e));
        });
        
        // Drawing tools
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectTool(e.target.dataset.tool));
        });
        
        document.getElementById('clearAllCanvas')?.addEventListener('click', () => this.clearAllCanvases());
        
        // Final actions
        document.getElementById('restartApp')?.addEventListener('click', () => this.restartApp());
        document.getElementById('downloadResults')?.addEventListener('click', () => this.downloadResults());
        
        // Role selection
        document.querySelectorAll('.role-option').forEach(option => {
            option.addEventListener('click', (e) => this.selectRole(e.currentTarget.dataset.role));
        });
    }

    renderScenarios() {
        const grid = document.getElementById('scenarioGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        Object.keys(this.scenarios).forEach(key => {
            const scenario = this.scenarios[key];
            const card = document.createElement('div');
            card.className = 'scenario-card';
            card.innerHTML = `
                <span class="scenario-icon">${scenario.icon}</span>
                <div class="scenario-name">${scenario.name}</div>
            `;
            card.addEventListener('click', () => this.selectScenario(key));
            grid.appendChild(card);
        });
    }

    selectScenario(scenarioKey) {
        this.selectedScenario = scenarioKey;
        const scenario = this.scenarios[scenarioKey];
        document.getElementById('animationTitle').textContent = `📺 ${scenario.name} 대화 예시`;
        this.goToStep(2);
    }

    goToStep(step) {
        // Hide all steps
        document.querySelectorAll('.step').forEach(el => el.classList.add('hidden'));
        
        // Show target step
        const targetStep = document.querySelector(`[id$="${this.getStepName(step)}"]`);
        if (targetStep) {
            targetStep.classList.remove('hidden');
        }
        
        this.currentStep = step;
        this.updateProgress(step);
        
        // Initialize step-specific content
        switch(step) {
            case 2:
                this.setupAnimationStep();
                break;
            case 3:
                this.setupRoleSelection();
                break;
            case 4:
                this.setupConversationPractice();
                break;
            case 5:
                this.setupVocabularyLearning();
                break;
            case 6:
                this.setupSpeakingTest();
                break;
            case 7:
                this.setupComicTest();
                break;
        }
    }

    getStepName(step) {
        const stepNames = {
            1: 'scenarioSelection',
            2: 'exampleAnimation', 
            3: 'roleSelection',
            4: 'conversationPractice',
            5: 'vocabularyLearning',
            6: 'speakingTest',
            7: 'comicTest'
        };
        return stepNames[step] || 'scenarioSelection';
    }

    updateProgress(step) {
        const fill = document.getElementById('progressFill');
        const stepText = document.getElementById('currentStep');
        
        if (fill) {
            fill.style.width = `${(step / 7) * 100}%`;
        }
        if (stepText) {
            stepText.textContent = step;
        }
    }

    setupAnimationStep() {
        // Reset animation state
        this.currentDialogueIndex = 0;
        const bubbleA = document.getElementById('bubbleA');
        const bubbleB = document.getElementById('bubbleB');
        
        if (bubbleA) bubbleA.classList.add('hidden');
        if (bubbleB) bubbleB.classList.add('hidden');
    }

    playAnimation() {
        if (!this.selectedScenario) return;
        
        const dialogues = this.scenarios[this.selectedScenario].dialogues;
        const bubbleA = document.getElementById('bubbleA');
        const bubbleB = document.getElementById('bubbleB');
        const characterA = document.getElementById('characterA');
        const characterB = document.getElementById('characterB');
        
        let index = 0;
        
        const showDialogue = () => {
            if (index >= dialogues.length) return;
            
            const dialogue = dialogues[index];
            const isRoleA = dialogue.role === 'A';
            const bubble = isRoleA ? bubbleA : bubbleB;
            const character = isRoleA ? characterA : characterB;
            const otherBubble = isRoleA ? bubbleB : bubbleA;
            const otherCharacter = isRoleA ? characterB : characterA;
            
            // Hide other bubble and remove speaking class
            otherBubble?.classList.add('hidden');
            otherCharacter?.classList.remove('speaking');
            
            // Show current bubble and add speaking class
            bubble.textContent = dialogue.text;
            bubble.classList.remove('hidden');
            character?.classList.add('speaking');
            
            // Text-to-speech
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(dialogue.text);
                utterance.lang = 'ko-KR';
                utterance.rate = 0.8;
                speechSynthesis.speak(utterance);
            }
            
            index++;
            
            this.animationTimer = setTimeout(() => {
                character?.classList.remove('speaking');
                if (index < dialogues.length) {
                    setTimeout(showDialogue, 1000);
                }
            }, 2500);
        };
        
        showDialogue();
    }

    pauseAnimation() {
        if (this.animationTimer) {
            clearTimeout(this.animationTimer);
            this.animationTimer = null;
        }
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
        }
    }

    replayAnimation() {
        this.pauseAnimation();
        this.setupAnimationStep();
        setTimeout(() => this.playAnimation(), 500);
    }

    setupRoleSelection() {
        if (!this.selectedScenario) return;
        
        const scenario = this.scenarios[this.selectedScenario];
        
        // Update role descriptions
        document.getElementById('roleADescription').textContent = 
            scenario.name === '학교(친구들)' ? '친구' : '서비스 제공자';
        document.getElementById('roleBDescription').textContent = 
            scenario.name.includes('학교') ? '학생' : '고객';
        
        // Render dialogue preview
        this.renderDialoguePreview();
    }

    renderDialoguePreview() {
        const dialogues = this.scenarios[this.selectedScenario].dialogues;
        const container = document.getElementById('dialogueList');
        
        if (!container) return;
        
        container.innerHTML = '';
        
        dialogues.forEach(dialogue => {
            const item = document.createElement('div');
            item.className = `dialogue-item role-${dialogue.role.toLowerCase()}`;
            item.innerHTML = `
                <div class="dialogue-content">
                    <div class="dialogue-korean"><strong>${dialogue.role}:</strong> ${dialogue.text}</div>
                    <div class="dialogue-english">${dialogue.translation}</div>
                </div>
            `;
            container.appendChild(item);
        });
    }

    selectRole(role) {
        this.selectedRole = role;
        
        // Update UI
        document.querySelectorAll('.role-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        document.querySelector(`[data-role="${role}"]`).classList.add('selected');
        document.getElementById('goToConversationPractice').disabled = false;
    }

    setupConversationPractice() {
        if (!this.selectedScenario || !this.selectedRole) return;
        
        const dialogues = this.scenarios[this.selectedScenario].dialogues;
        
        // Filter dialogues for practice (opposite role)
        this.practiceDialogues = dialogues.filter((_, index) => {
            const dialogue = dialogues[index];
            const nextDialogue = dialogues[index + 1];
            return dialogue.role !== this.selectedRole && nextDialogue && nextDialogue.role === this.selectedRole;
        });
        
        this.currentDialogueIndex = 0;
        this.userResponses = [];
        this.showNextPracticeDialogue();
    }

    showNextPracticeDialogue() {
        if (this.currentDialogueIndex >= this.practiceDialogues.length) {
            this.finishPractice();
            return;
        }
        
        const dialogue = this.practiceDialogues[this.currentDialogueIndex];
        document.getElementById('partnerMessage').textContent = dialogue.text;
        document.getElementById('userResponse').value = '';
        document.getElementById('practiceFeedback').classList.add('hidden');
        document.getElementById('practiceProgress').textContent = `${this.currentDialogueIndex + 1}/${this.practiceDialogues.length}`;
    }

    submitResponse() {
        const userResponse = document.getElementById('userResponse').value.trim();
        if (!userResponse) return;
        
        const dialogues = this.scenarios[this.selectedScenario].dialogues;
        const currentPartnerDialogue = this.practiceDialogues[this.currentDialogueIndex];
        
        // Find correct answer
        const partnerIndex = dialogues.findIndex(d => d.text === currentPartnerDialogue.text);
        const correctAnswer = dialogues[partnerIndex + 1];
        
        // Store response
        this.userResponses.push({
            question: currentPartnerDialogue.text,
            userAnswer: userResponse,
            correctAnswer: correctAnswer.text,
            score: this.calculateSimilarity(userResponse, correctAnswer.text)
        });
        
        // Show feedback
        this.showPracticeFeedback(userResponse, correctAnswer.text);
        
        // Move to next dialogue
        this.currentDialogueIndex++;
        setTimeout(() => this.showNextPracticeDialogue(), 3000);
    }

    showPracticeFeedback(userAnswer, correctAnswer) {
        document.getElementById('correctAnswer').textContent = correctAnswer;
        document.getElementById('feedbackMessage').textContent = this.getFeedbackMessage(userAnswer, correctAnswer);
        document.getElementById('practiceFeedback').classList.remove('hidden');
        document.getElementById('practiceFeedback').classList.add('show');
    }

    getFeedbackMessage(userAnswer, correctAnswer) {
        const similarity = this.calculateSimilarity(userAnswer, correctAnswer);
        
        if (similarity > 0.8) {
            return "🎉 완벽합니다! 정확한 표현이에요.";
        } else if (similarity > 0.6) {
            return "👍 좋아요! 의미가 잘 전달됩니다.";
        } else if (similarity > 0.4) {
            return "🤔 괜찮아요! 조금 더 정확한 표현을 연습해보세요.";
        } else {
            return "💪 계속 연습하세요! 모범 답안을 참고해보세요.";
        }
    }

    calculateSimilarity(str1, str2) {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        
        if (longer.length === 0) return 1.0;
        
        const distance = this.levenshteinDistance(longer, shorter);
        return (longer.length - distance) / longer.length;
    }

    levenshteinDistance(str1, str2) {
        const matrix = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }

    showHint() {
        const dialogues = this.scenarios[this.selectedScenario].dialogues;
        const currentPartnerDialogue = this.practiceDialogues[this.currentDialogueIndex];
        const partnerIndex = dialogues.findIndex(d => d.text === currentPartnerDialogue.text);
        const correctAnswer = dialogues[partnerIndex + 1];
        
        const hint = correctAnswer.text.substring(0, Math.floor(correctAnswer.text.length / 2)) + "...";
        document.getElementById('userResponse').placeholder = `힌트: ${hint}`;
    }

    finishPractice() {
        document.getElementById('goToVocabulary').disabled = false;
        alert('대화 연습이 완료되었습니다! 어휘 학습으로 이동할 수 있습니다.');
    }

    setupVocabularyLearning() {
        this.renderVocabularyCards();
        this.setupVocabularyTest();
    }

    renderVocabularyCards() {
        const vocabulary = this.scenarios[this.selectedScenario].vocabulary;
        const grid = document.getElementById('vocabularyGrid');
        
        if (!grid) return;
        
        grid.innerHTML = '';
        
        vocabulary.forEach(word => {
            const card = document.createElement('div');
            card.className = 'vocabulary-card';
            card.innerHTML = `
                <button class="vocab-audio-btn">🔊</button>
                <div class="vocab-word">${word.word}</div>
                <div class="vocab-meaning">${word.meaning}</div>
                <div class="vocab-example">"${word.example}"</div>
            `;
            
            // Add click handlers
            card.addEventListener('click', () => this.flipVocabularyCard(card));
            card.querySelector('.vocab-audio-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                this.playWordAudio(word.word);
            });
            
            grid.appendChild(card);
        });
    }

    flipVocabularyCard(card) {
        card.classList.toggle('flipped');
    }

    playWordAudio(word) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = 'ko-KR';
            utterance.rate = 0.7;
            speechSynthesis.speak(utterance);
        }
    }

    setupVocabularyTest() {
        this.vocabularyProgress = [];
        this.currentVocabIndex = 0;
        this.showNextVocabularyQuestion();
    }

    showNextVocabularyQuestion() {
        const vocabulary = this.scenarios[this.selectedScenario].vocabulary;
        
        if (this.currentVocabIndex >= vocabulary.length) {
            this.finishVocabularyTest();
            return;
        }
        
        const word = vocabulary[this.currentVocabIndex];
        const otherWords = vocabulary.filter(w => w !== word);
        
        // Create options (correct + 2 wrong)
        const options = [word.meaning];
        const shuffledOthers = otherWords.sort(() => 0.5 - Math.random());
        options.push(...shuffledOthers.slice(0, 2).map(w => w.meaning));
        
        // Shuffle options
        options.sort(() => 0.5 - Math.random());
        
        // Update UI
        document.getElementById('questionWord').textContent = word.word;
        const optionsContainer = document.getElementById('questionOptions');
        optionsContainer.innerHTML = '';
        
        options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option;
            btn.addEventListener('click', () => this.selectVocabularyOption(option, word.meaning));
            optionsContainer.appendChild(btn);
        });
        
        document.getElementById('vocabResult').innerHTML = '';
    }

    selectVocabularyOption(selected, correct) {
        const isCorrect = selected === correct;
        
        // Update button states
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === correct) {
                btn.classList.add('correct');
            } else if (btn.textContent === selected && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });
        
        // Show result
        const resultElement = document.getElementById('vocabResult');
        resultElement.className = `vocab-result ${isCorrect ? 'correct' : 'incorrect'}`;
        resultElement.textContent = isCorrect ? '✅ 정답입니다!' : '❌ 틀렸습니다. 다시 시도해보세요.';
        
        // Store progress
        this.vocabularyProgress.push({
            word: document.getElementById('questionWord').textContent,
            correct: isCorrect
        });
        
        // Move to next question
        this.currentVocabIndex++;
        setTimeout(() => this.showNextVocabularyQuestion(), 2000);
    }

    finishVocabularyTest() {
        const score = this.vocabularyProgress.filter(p => p.correct).length;
        const total = this.vocabularyProgress.length;
        
        document.getElementById('vocabResult').innerHTML = `
            <h3>어휘 테스트 완료!</h3>
            <p>점수: ${score}/${total} (${Math.round(score/total*100)}%)</p>
        `;
        
        setTimeout(() => {
            document.getElementById('goToSpeakingTest').disabled = false;
        }, 2000);
    }

    setupSpeakingTest() {
        this.speakingProgress = [];
        this.currentSpeechIndex = 0;
        this.showNextSpeechSentence();
    }

    showNextSpeechSentence() {
        const practices = this.scenarios[this.selectedScenario].practice;
        
        if (this.currentSpeechIndex >= practices.length) {
            this.finishSpeakingTest();
            return;
        }
        
        const sentence = practices[this.currentSpeechIndex];
        document.getElementById('targetSentence').textContent = sentence;
        document.getElementById('recognizedText').textContent = '여기에 인식된 텍스트가 표시됩니다.';
        document.getElementById('recognizedText').classList.remove('has-content');
        document.getElementById('accuracyFeedback').classList.remove('show');
        document.getElementById('speakingProgress').textContent = `${this.currentSpeechIndex + 1}/${practices.length}`;
        document.getElementById('nextSentenceBtn').disabled = true;
    }

    initializeSpeechRecognition() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.warn('Speech recognition not supported');
            return;
        }
        
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'ko-KR';
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        
        this.recognition.onstart = () => {
            document.getElementById('speechStatus').innerHTML = '<span>🎤 듣고 있습니다... 말씀해주세요.</span>';
            document.getElementById('speechStatus').className = 'status-indicator listening';
        };
        
        this.recognition.onresult = (event) => {
            const result = event.results[0][0].transcript;
            const target = document.getElementById('targetSentence').textContent;
            
            document.getElementById('recognizedText').textContent = result;
            document.getElementById('recognizedText').classList.add('has-content');
            
            const accuracy = this.calculateSimilarity(result, target);
            this.showSpeechFeedback(accuracy);
            
            this.speakingProgress.push({
                target: target,
                recognized: result,
                accuracy: accuracy
            });
            
            document.getElementById('nextSentenceBtn').disabled = false;
        };
        
        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            document.getElementById('speechStatus').innerHTML = '<span>오류가 발생했습니다. 다시 시도해주세요.</span>';
            document.getElementById('speechStatus').className = 'status-indicator';
        };
        
        this.recognition.onend = () => {
            this.isRecording = false;
            document.getElementById('speechStatus').innerHTML = '<span>음성 인식이 완료되었습니다.</span>';
            document.getElementById('speechStatus').className = 'status-indicator';
        };
    }

    toggleSpeechRecognition() {
        if (!this.recognition) {
            alert('음성 인식을 지원하지 않는 브라우저입니다.');
            return;
        }
        
        if (this.isRecording) {
            this.recognition.stop();
        } else {
            this.isRecording = true;
            this.recognition.start();
        }
    }

    playSentence() {
        const sentence = document.getElementById('targetSentence').textContent;
        
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(sentence);
            utterance.lang = 'ko-KR';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        }
    }

    showSpeechFeedback(accuracy) {
        const feedback = document.getElementById('accuracyFeedback');
        
        let message, className;
        if (accuracy > 0.8) {
            message = '🎉 완벽한 발음입니다!';
            className = 'excellent';
        } else if (accuracy > 0.6) {
            message = '👍 좋은 발음이에요!';
            className = 'good';
        } else {
            message = '💪 조금 더 연습해보세요!';
            className = 'needs-improvement';
        }
        
        feedback.textContent = message;
        feedback.className = `accuracy-feedback ${className} show`;
    }

    nextSentence() {
        this.currentSpeechIndex++;
        this.showNextSpeechSentence();
    }

    finishSpeakingTest() {
        const avgAccuracy = this.speakingProgress.reduce((sum, p) => sum + p.accuracy, 0) / this.speakingProgress.length;
        
        document.getElementById('accuracyFeedback').innerHTML = `
            <h3>말하기 테스트 완료!</h3>
            <p>평균 정확도: ${Math.round(avgAccuracy * 100)}%</p>
        `;
        
        document.getElementById('goToComicTest').disabled = false;
    }

    setupComicTest() {
        this.comicData = [];
        this.setupFileUploads();
        this.setupDrawingCanvas();
    }

    setupFileUploads() {
        document.querySelectorAll('.image-upload-area').forEach(area => {
            const fileInput = area.querySelector('.file-input');
            
            area.addEventListener('click', () => fileInput.click());
            
            area.addEventListener('dragover', (e) => {
                e.preventDefault();
                area.style.borderColor = 'var(--color-primary)';
            });
            
            area.addEventListener('dragleave', () => {
                area.style.borderColor = 'var(--color-border)';
            });
            
            area.addEventListener('drop', (e) => {
                e.preventDefault();
                area.style.borderColor = 'var(--color-border)';
                
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.handleImageUpload(files[0], area);
                }
            });
        });
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        const uploadArea = event.target.closest('.image-upload-area');
        
        if (file && file.type.startsWith('image/')) {
            this.handleImageUpload(file, uploadArea);
        }
    }

    handleImageUpload(file, uploadArea) {
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadArea.style.backgroundImage = `url(${e.target.result})`;
            uploadArea.classList.add('has-image');
            uploadArea.querySelector('.upload-placeholder').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }

    setupDrawingCanvas() {
        this.currentTool = 'pen';
        this.currentColor = '#000000';
        this.currentBrushSize = 3;
        
        document.querySelectorAll('.drawing-canvas').forEach(canvas => {
            this.initializeCanvas(canvas);
        });
    }

    initializeCanvas(canvas) {
        const ctx = canvas.getContext('2d');
        let isDrawing = false;
        
        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            const rect = canvas.getBoundingClientRect();
            ctx.beginPath();
            ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
        });
        
        canvas.addEventListener('mousemove', (e) => {
            if (!isDrawing) return;
            
            const rect = canvas.getBoundingClientRect();
            ctx.lineWidth = this.currentBrushSize;
            ctx.lineCap = 'round';
            
            if (this.currentTool === 'pen') {
                ctx.globalCompositeOperation = 'source-over';
                ctx.strokeStyle = this.currentColor;
            } else {
                ctx.globalCompositeOperation = 'destination-out';
            }
            
            ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
        });
        
        canvas.addEventListener('mouseup', () => {
            isDrawing = false;
            ctx.beginPath();
        });
        
        // Touch events for mobile
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        });
        
        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        });
        
        canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            const mouseEvent = new MouseEvent('mouseup', {});
            canvas.dispatchEvent(mouseEvent);
        });
    }

    toggleDrawing(panelNumber) {
        const canvas = document.querySelector(`[data-panel="${panelNumber}"].drawing-canvas`);
        const uploadArea = document.querySelector(`[data-panel="${panelNumber}"].image-upload-area`);
        
        if (canvas.classList.contains('hidden')) {
            canvas.classList.remove('hidden');
            canvas.classList.add('active');
            uploadArea.style.display = 'none';
        } else {
            canvas.classList.add('hidden');
            canvas.classList.remove('active');
            uploadArea.style.display = 'flex';
        }
    }

    selectTool(tool) {
        this.currentTool = tool;
        
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.querySelector(`[data-tool="${tool}"]`).classList.add('active');
    }

    clearAllCanvases() {
        document.querySelectorAll('.drawing-canvas').forEach(canvas => {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
    }

    completeTest() {
        // Collect comic data
        this.comicData = [];
        
        for (let i = 1; i <= 4; i++) {
            const canvas = document.querySelector(`[data-panel="${i}"].drawing-canvas`);
            const textArea = document.querySelector(`[data-panel="${i}"].bubble-text`);
            const uploadArea = document.querySelector(`[data-panel="${i}"].image-upload-area`);
            
            this.comicData.push({
                panel: i,
                hasDrawing: !canvas.classList.contains('hidden'),
                hasImage: uploadArea.classList.contains('has-image'),
                text: textArea.value.trim()
            });
        }
        
        this.showFinalResults();
    }

    showFinalResults() {
        // Calculate scores
        const practiceScore = this.userResponses ? 
            Math.round(this.userResponses.reduce((sum, r) => sum + r.score, 0) / this.userResponses.length * 100) : 0;
        
        const vocabScore = this.vocabularyProgress ? 
            Math.round(this.vocabularyProgress.filter(p => p.correct).length / this.vocabularyProgress.length * 100) : 0;
        
        const speakingScore = this.speakingProgress ? 
            Math.round(this.speakingProgress.reduce((sum, p) => sum + p.accuracy, 0) / this.speakingProgress.length * 100) : 0;
        
        const comicScore = this.comicData ? 
            Math.round(this.comicData.filter(c => c.text.length > 0).length / 4 * 100) : 0;
        
        const totalScore = Math.round((practiceScore + vocabScore + speakingScore + comicScore) / 4);
        
        // Display results
        const resultsContainer = document.getElementById('resultsSummary');
        resultsContainer.innerHTML = `
            <h3>📊 학습 결과</h3>
            <div class="result-item">
                <span>대화 연습</span>
                <span class="result-score">${practiceScore}점</span>
            </div>
            <div class="result-item">
                <span>어휘 학습</span>
                <span class="result-score">${vocabScore}점</span>
            </div>
            <div class="result-item">
                <span>말하기 테스트</span>
                <span class="result-score">${speakingScore}점</span>
            </div>
            <div class="result-item">
                <span>만화 창작</span>
                <span class="result-score">${comicScore}점</span>
            </div>
            <hr>
            <div class="result-item" style="border-top: 2px solid var(--color-primary); padding-top: 16px;">
                <span><strong>총점</strong></span>
                <span class="result-score" style="font-size: 2rem;">${totalScore}점</span>
            </div>
            <p style="text-align: center; margin-top: 20px;">
                ${this.getFinalMessage(totalScore)}
            </p>
        `;
        
        this.goToStep('finalResults');
    }

    getFinalMessage(score) {
        if (score >= 90) {
            return '🎉 축하합니다! 한국어 실력이 뛰어나시네요!';
        } else if (score >= 80) {
            return '👏 잘했습니다! 꾸준히 연습하시면 더욱 향상될 거예요!';
        } else if (score >= 70) {
            return '👍 좋은 시작입니다! 조금 더 연습해보세요!';
        } else {
            return '💪 포기하지 마세요! 계속 연습하면 분명히 늘 거예요!';
        }
    }

    restartApp() {
        // Reset all state
        this.currentStep = 1;
        this.selectedScenario = null;
        this.selectedRole = null;
        this.currentDialogueIndex = 0;
        this.practiceDialogues = [];
        this.userResponses = [];
        this.vocabularyProgress = [];
        this.speakingProgress = [];
        this.comicData = [];
        
        // Reset UI
        document.querySelectorAll('.step').forEach(el => el.classList.add('hidden'));
        document.getElementById('scenarioSelection').classList.remove('hidden');
        
        this.updateProgress(1);
        this.renderScenarios();
    }

    downloadResults() {
        const results = {
            scenario: this.selectedScenario,
            role: this.selectedRole,
            practiceResults: this.userResponses,
            vocabularyResults: this.vocabularyProgress,
            speakingResults: this.speakingProgress,
            comicResults: this.comicData,
            completedAt: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(results, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `korean-practice-results-${new Date().toISOString().slice(0,10)}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new KoreanConversationApp();
});