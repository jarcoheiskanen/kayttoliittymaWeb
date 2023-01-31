

// document.querySelector('.class')
// document.querySelector('#id')

let isWaiting = false;

const checkboxHolders = document.querySelectorAll('.checkboxHolder');

checkboxHolders.forEach((checkboxHolder) => {
    checkboxHolder.addEventListener('click', () => { // Kuuntelee jos sitä painetaan
        const checkbox = checkboxHolder.querySelector('#checkbox')
        checkbox.checked = !checkbox.checked; // Vaihtaa checkbox:in 'checked' sen vastapuoliseen valueen. Esim: false -> true
    });
});

function markAnswers() {

    const checkboxes = document.querySelectorAll('#checkbox');

    checkboxes.forEach((checkbox) => {
        const label = document.getElementById('checkbox_'+checkbox.value);
        if (checkbox.checked) {
            label.innerHTML = checkbox.value+" tunnit pidetty";
        } else {
            label.innerHTML = checkbox.value
        };
    });

}

function submitAnswer() {

    const nameBox = document.querySelector('#fname');
    const infoBox = document.querySelector('#cinfo');
    const commentList = document.querySelector('#commentList');

    if (!nameBox.value == "" && !nameBox.value == " " && !infoBox.value == "" && !infoBox.value == " ") {

        const newComment = document.createElement('td');
        const commentText = document.createElement('p');

        newComment.classList = 'box roundedBox normalMargin lightGrey';
        commentText.innerHTML = nameBox.value+": "+infoBox.value;
        
        commentList.appendChild(newComment);
        newComment.appendChild(commentText);

    };

};

function submitButtonPressed(fade) {

    const warningBox = document.querySelector('.warningBox');
    const warningText = document.querySelector('.warningText');
    const warningButton = document.querySelector(".warningButton");
    const nameBox = document.querySelector('#fname');
    const infoBox = document.querySelector('#cinfo');

    let allFilled = false;

    console.log(nameBox.value, infoBox.value)

    if (!nameBox.value == "" && !nameBox.value == " " && !infoBox.value == "" && !infoBox.value == " ") {
        allFilled = true
    }

    if (fade) {
        allFilled = true;
    };

    console.log(allFilled, (allFilled && 0) || 1);

    warningBox.style.transform = `scale(${(allFilled && '0') || '1'})`;
    warningBox.style.marginTop = `${(allFilled && '0px') || '15px'}`;
    warningBox.style.marginBottom = `${(allFilled && '0px') || '15px'}`;

    warningText.style.marginTop = `${(allFilled && '0px') || '15px'}`;
    warningText.style.marginBottom = `${(allFilled && '0px') || '15px'}`;

    warningButton.style.backgroundColor = `${(allFilled && 'rgb(40, 40, 40)') || 'rgb(70, 0, 0)'}`;
    warningButton.innerHTML = (allFilled && "Lisää tieto") ||"Virhe! Ei lisännyt tietoa.";

    if (!fade && !isWaiting) {
        isWaiting = true;
        setTimeout(function() {
            isWaiting = false;
            submitButtonPressed(true);
        }, 30000);
    };

}


// Responsiveness

function applyResChanges() {

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const smallScreenWidthSize = 600;
    const bigScreenWidthSize = 900;

    const smallScreenHeightSize = 550;
    const bigScreenHeightSize = 900;

    const element = document.querySelector('body')
    let newScale, transX, transY;

    transX = 1;
    transY = 1;

    if (viewportWidth < smallScreenWidthSize) {
        newScale = .5;
    } else if (viewportWidth >= smallScreenWidthSize && viewportWidth < bigScreenWidthSize) {
        newScale = .75;
    } else {
        newScale = 1;
    };

    if (viewportHeight < smallScreenHeightSize) {
        newScale = .5
        transY = -20;
    } else if (viewportHeight >= smallScreenHeightSize && viewportHeight < bigScreenHeightSize) {
        newScale = .5;
        transY = -20;
    } else {
        newScale = 1;
    };

    element.style.transform = `scale(${newScale}) translate(${transX}%, ${transY}%)`;

};

applyResChanges();
window.addEventListener('resize', applyResChanges);