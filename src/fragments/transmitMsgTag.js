const writeTag = ({ redMsg = '', blueMsg = '', greenMsg = '' }) => {
    return /*html*/ `
        <div style="border-style: solid; padding: 10px; margin: 10px;">
            <div>코드 조각을 사용할 때 마다 다른 메시지 정의</div>
            <div style="color: red;">
                ${redMsg}
            </div>
            <div style="color: blue;">
                ${blueMsg}
            </div>
            <div style="color: green;">
                ${greenMsg}
            </div>
        </div>
    `;
}

export { writeTag as write };