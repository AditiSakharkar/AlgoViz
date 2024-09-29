const array = [];
const arraySize = 20;
const arrayContainer = document.getElementById('array-container');

document.querySelectorAll('.controls button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        const tooltipText = this.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.innerText = tooltipText;
        this.appendChild(tooltip);
    });

    button.addEventListener('mouseleave', function() {
        const tooltip = this.querySelector('.tooltip');
        if (tooltip) {
            this.removeChild(tooltip);
        }
    });
});

function createArray() {
    array.length = 0;
    for (let i = 0; i < arraySize; i++) {
        array[i] = Math.floor(Math.random() * 200) + 20; 
    }
    displayArray();
}

function displayArray() {
    arrayContainer.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${array[i]}px`;
        arrayContainer.appendChild(bar);
    }
}

async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            highlightBars(j, j + 1);
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                displayArray();
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            removeHighlight(j, j + 1);
        }
        markSorted(array.length - i - 1);
    }
    markAllSorted();
}

async function selectionSort() {
    for (let i = 0; i < array.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            highlightBars(i, j);
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
            removeHighlight(i, j);
        }
        if (minIdx !== i) {
            let temp = array[i];
            array[i] = array[minIdx];
            array[minIdx] = temp;
            displayArray();
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        markSorted(i);
    }
    markAllSorted();
}

async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            highlightBars(j, j + 1);
            array[j + 1] = array[j];
            displayArray();
            await new Promise(resolve => setTimeout(resolve, 100));
            removeHighlight(j, j + 1);
            j = j - 1;
        }
        array[j + 1] = key;
        displayArray();
        markSorted(i);
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    markAllSorted();
}

function highlightBars(index1, index2) {
    arrayContainer.children[index1].classList.add('swapping');
    arrayContainer.children[index2].classList.add('swapping');
}

function removeHighlight(index1, index2) {
    arrayContainer.children[index1].classList.remove('swapping');
    arrayContainer.children[index2].classList.remove('swapping');
}

function markSorted(index) {
    arrayContainer.children[index].classList.add('sorted');
}

function markAllSorted() {
    for (let i = 0; i < array.length; i++) {
        arrayContainer.children[i].classList.add('sorted');
    }
}


async function linearSearchAnimation() {
    const target = array[Math.floor(Math.random() * array.length)];
    let i = 0;
    const bars = arrayContainer.children;

    while (i < array.length) {
        highlightBars(i, i);
        if (array[i] === target) {
            alert(`Element ${target} found at index ${i}`);
            markSorted(i);
            break;
        }
        await new Promise(resolve => setTimeout(resolve, 600));
        removeHighlight(i, i);
        i++;
    }
    if (i === array.length) {
        alert(`Element ${target} not found`);
    }
}


async function binarySearchAnimation() {
    const sortedArray = [...array];
    await insertionSort(sortedArray); 

    const target = sortedArray[Math.floor(Math.random() * sortedArray.length)];
    let left = 0;
    let right = sortedArray.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        highlightBars(mid, mid);
        await new Promise(resolve => setTimeout(resolve, 600));

        if (sortedArray[mid] === target) {
            alert(`Element ${target} found at index ${mid}`);
            markSorted(mid);
            break;
        } else if (sortedArray[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
        removeHighlight(mid, mid);
    }
    if (left > right) {
        alert(`Element ${target} not found`);
    }
}

createArray();
