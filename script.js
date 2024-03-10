// Code for images in the left window home page
// Function to open the enlarged image modal
function openEnlargedImage(src) {
    const modal = document.querySelector('.enlarged-image-modal');
    const enlargedImage = document.querySelector('.enlarged-image');
    enlargedImage.src = src;
    modal.style.display = 'flex';
}

// Function to close the enlarged image modal
function closeEnlargedImage(event) {
    // Check if the click target or its parent is the close button
    const isCloseButton = event.target.classList.contains('close-button') ||
                          event.target.parentElement.classList.contains('close-button');

    if (isCloseButton) {
        const modal = document.querySelector('.enlarged-image-modal');
        modal.style.display = 'none';
    }
}

// Event listener for closing the enlarged image modal
document.addEventListener('click', closeEnlargedImage);

// Prevent closing the modal when clicking on the enlarged image
document.querySelector('.enlarged-image').addEventListener('click', function (event) {
    event.stopPropagation();
});

// Function to copy the text to the clipboard with a network message
function copyText(elementId, networkMessage) {
    var textElement = document.getElementById(elementId);

    // Create a textarea element
    var textArea = document.createElement("textarea");
    textArea.value = textElement.textContent;
    document.body.appendChild(textArea);

    // Select the text in the textarea
    textArea.select();

    try {
        // Copy the selected text to the clipboard using the modern clipboard API
        navigator.clipboard.writeText(textArea.value)
            .then(() => {
                // Create a custom notification with the copied address and network message
                var notification = document.createElement("div");
                notification.classList.add("copy-notification");
                notification.innerHTML = "<span style='font-weight: bold; font-size: 110%;'>Address copied!</span><br>" + networkMessage.replace(/\n/g, '<br>');
                document.body.appendChild(notification);

                // After a delay, remove the notification and the temporary textarea
                setTimeout(function () {
                    document.body.removeChild(notification);
                    document.body.removeChild(textArea);
                }, 5000); 
            })
            .catch(err => {
                console.error("Unable to copy the text: ", err);
            });

    } catch (err) {
        console.error("Unable to copy the text: ", err);
    }
}

// Function to add/remove the 'hovered' class on the crypto address
function toggleHoveredClass(addressId) {
    const cryptoAddress = document.getElementById(addressId);
    cryptoAddress.classList.toggle('hovered');
}

// Add event listeners to all crypto buttons
const cryptoButtons = document.querySelectorAll('.crypto-button');

cryptoButtons.forEach(button => {
    button.addEventListener('mouseover', function() {
        // Extract the corresponding address ID from the button's data attribute
        const addressId = this.getAttribute('data-address-id');
        toggleHoveredClass(addressId);
    });

    button.addEventListener('mouseout', function() {
        // Extract the corresponding address ID from the button's data attribute
        const addressId = this.getAttribute('data-address-id');
        toggleHoveredClass(addressId);
    });
});
