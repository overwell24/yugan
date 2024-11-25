var fileupload = document.getElementById("fileupload");
var input = document.getElementById("input");

// 드래그 앤 드롭으로 파일을 업로드할 때
fileupload.addEventListener("drop", (event) => {
    event.preventDefault();
    console.log("drop");

    // 드롭된 파일을 가져오기
    const files = event.dataTransfer?.files;

    if (files.length > 0) {
        // 드래그된 파일을 input.files에 추가
        const dataTransfer = new DataTransfer();
        for (let i = 0; i < files.length; i++) {
            dataTransfer.items.add(files[i]);
        }

        // input에 파일 목록 추가
        input.files = dataTransfer.files;
        console.log(input.files);

        // 폼 전송
        submitForm();
    }
});

// 업로드 버튼 클릭 시 파일 선택 창 열기
fileupload.addEventListener("click", () => {
    //input.click();  // 파일 선택 다이얼로그를 여는 명령
});

// 파일이 선택되었을 때
input.addEventListener("change", () => {
    const files = input.files;
    if (files.length > 0) {
        console.log("선택된 파일:", files[0].name);  // 선택된 파일의 이름 출력
        // 폼 전송
        submitForm();
    }
});

// 폼 제출 함수
function submitForm() {
    const form = document.getElementById("fileupload");
    form.submit();  // 폼을 제출
}

// 드래그 중
fileupload.addEventListener("dragover", (event) => {
    event.preventDefault();
    // 드래그 중일 때 border 변경
    fileupload.style.boxSizing = "border-box";
    fileupload.style.border = "2px dashed #f7b4b4"; // 빨간색 점선 테두리
});

fileupload.addEventListener("dragleave", () => {
    // 드래그가 떠날 때 border 초기화
    fileupload.style.border = "none"; // border 제거
});

// 마우스 오버, 아웃으로 스타일 추가
fileupload.addEventListener("mouseover", (event) => {
    event.preventDefault();
    fileupload.style.boxSizing = "border-box";
    fileupload.style.border = "2px dashed #f7b4b4"; // 빨간색 점선 테두리
});

fileupload.addEventListener("mouseout", (event) => {
    event.preventDefault();
    fileupload.style.border = "none"; // 빨간색 점선 테두리
});

fileupload.addEventListener("drop", (event) => {
    event.preventDefault();
    fileupload.style.border = "none"; // 빨간색 점선 테두리
});

document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("input");
    const fileUploadForm = document.getElementById("fileupload");
    const loadingDiv = document.createElement("div");

    // Set up the loading div with the SVG and message
    loadingDiv.className = "fileupload";
    loadingDiv.innerHTML = `
        <svg class="loading" xmlns="http://www.w3.org/2000/svg" width="83" height="85" viewBox="0 0 83 85" fill="none">
            <path d="M17.0456 18.0459L24.3818 25.3821" stroke="#4D0000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M58.6179 59.6179L65.9541 66.9541" stroke="#4D0000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M65.9544 18.0459L58.6182 25.3821" stroke="#4D0000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M24.3821 59.6179L17.0459 66.9541" stroke="#4D0000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path opacity="0.3" d="M41.5 7.91669L41.5 18.2917" stroke="#4D0000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path opacity="0.3" d="M41.501 66.7089L41.501 77.0839" stroke="#4D0000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path opacity="0.3" d="M6.91699 42.4999H17.292" stroke="#4D0000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path opacity="0.3" d="M65.709 42.5006H76.084" stroke="#4D0000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg> 
        <p class="afile"> 분석 중... </p>
    `;

    // Function to show loading div and hide form
    function showLoading() {
        fileUploadForm.style.display = "none";
        fileUploadForm.parentNode.insertBefore(loadingDiv, fileUploadForm); // Insert loadingDiv at the same position as fileUploadForm

        setTimeout(() => {
            fileUploadForm.submit(); // Submit form after 2 seconds
        }, 2000);
    }

    // Trigger loading div on file selection
    fileInput.addEventListener("change", () => {
        showLoading();
    });
});
