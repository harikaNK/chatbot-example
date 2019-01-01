function search() {
    alert("search");
}

$(document).ready(function () {

    //set speech recognition interface
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

    //check whether speech recognition API is supported by browser or not
    if ('SpeechRecognition' in window) {
        // speech recognition API supported
       // console.log("Speech API supported");
    } else {
        // speech recognition API not supported
        //console.log("Speech API not supported");
    }


    $("#start").click(function () { //after start button is clicked
       // console.log("clicked");

        let finalTranscript = '';
        let found = '';

        //ask user if they want to allow microphone or not
        let recognition = new window.SpeechRecognition(); //instance of speech recognition

        recognition.interimResults = true;
        recognition.maxAlternatives = 10;
        recognition.continuous = true;

        //records data when user starts speaking
        recognition.onresult = (event) => {
            let interimTranscript = '';

            for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
                let transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }
            document.querySelector('body').innerHTML = finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</>';
        
            //when the use stops talking
            recognition.onspeechend = function() {
                //console.log('Speech has stopped being detected');
           
                //stop recognition
                recognition.stop();

                //call 'search' method
                search();
            }

             //on error
            recognition.onerror = function(event) {
                console.log(event.error);
            };

        }       

        recognition.start();

    });

});


