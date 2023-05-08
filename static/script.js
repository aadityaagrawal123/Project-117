$(document).ready(function(){

    console.log('Ready')

    //  Fetch the current date and update it in the DOM
    var date_extract = new Date()
    let date= "Date:" + date_extract.toLocaleDateString()

    $(document).ready(function () {
        $("#date").html(date)
    })

    //  write an event, when Submit button is clicked
    $('button').click(function(){

        //  get the text value from the textarea using the 'val()' method
        let text_value = $('#text').val()
        let input_text = {'text' : text_value}

        console.log(input_text)

        //  ajax request
        $.ajax({
            type : 'POST',
            url: "/customer-review",
            data : JSON.stringify(input_text),
            dataType : 'json',
            contentType : 'application/json',

            success : function(result){
                predicted_emotion = result.data.predicted_emotion
                emo_url = result.data.predicted_emotion_img_url
                
                $("#sentiment").html(predicted_emotion)
                $('#sentiment').css("display", "block");

                $("#emoji").attr('src', emo_url);
                $('#emoji').css("display", "block");

            },

            //  if any error, run this function
            error : function(result){
                alert(result.responseJSON.message)
            }
        })


        //  clearing the textbox after every button push
        $('#text').val("")
    })
        
})