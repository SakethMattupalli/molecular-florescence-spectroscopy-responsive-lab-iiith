// This file contains all general functions used in the experiment
    
    var images = [];// Two images that are alternated in ordered to get the blinking effect of the spectrophotometer
    images[0] = "../../common_images/spec_with_red.png";
    images[1] = "../../common_images/spec_with_red.png";
    var x = 0;
    var y = 0;
    // Variables necessary to obtain motion of all the images
    var initial_top;
    var initial_left;
    var final_top;
    var final_left;
    var step;
    var elem;
    var img,img1;
    var id,id1;
    var type_of_movement;// Indicates upward or downward motion
    var sol_name; // Used to store the solution concentration value.
    // Variables used for graph validation
    var dropdown; // To select the scan mode from the drop down menu.
    var input1, input2, input3;
    var video1, video2, video3,
    video4, video5;
    var step_no=0; /*This variable is used to perform all the actions in the required sequence. 
                     Depending on the value of this variable the part of the method is called.*/
    var count = 0; /* This variable is used to perform the actions on the objects without distortions.
                      i.e., It make sures that one or more actions are not performed at a time. */

/*This method is called when the page is loaded. 
// first function helps in providing basic functionality to manual button and also sets the first set of instructions
// second function adds click events to elements as soon as the page loads.
// third function adds mouse events to elements as soon as the page loads. */
window.onload = function(){ 
    initial_function();
    addclickEvents();
    mouseEvents();
}
//It helps in providing basic functionality to manual button and also sets the first set of instructions.
function initial_function(){
        // Intial intrsuction to be followed
        document.getElementById("demo").innerHTML = "Prepare 10<sup>-3</sup>M, 10<sup>-4</sup>M, 10<sup>-5</sup>M, and 10<sup>-6</sup>M solutions of anthracene in spectroscopic grade cyclohexane. Note that very dilute solutions are not prepared directly. Lower concentration solutions are prepared via dilution of higher concentration solutions.To take a particular solution, first click on the appropriate concentration on the concentration selection bar and then on the volumetric flask. For measurement, start with the most dilute solution first (here, 10<sup>-6</sup>M) and proceed to next higher concentration and so on.";
        var modal = document.getElementById('manual');
        // Get the button that opens the manual modal
        var btn = document.getElementById("manual_button");
        // Get the <span> element that closes the manual modal
        var span = document.getElementsByClassName("close")[0];
        // When the user clicks the button, open the manual modal 
        btn.onclick = function() {
            modal.style.display = "block";
        };
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        };
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
}

// When user clicks on the Data button it redirects him to the page containing slideshow of two graphs 
function popitup(url) {
        // Opens a new browser window called newwindow. url specifies the URL of the page to open.
        newwindow=window.open(url,'name','height=390,width=350',"_parent");
        // Sets focus to the new window if the focus is on the previous page.
        if (window.focus) {
            newwindow.focus()
        }
        return false;
}

//This function is used to add click events to elements.
function addclickEvents(){
        document.getElementById("reset_btn").addEventListener("click", function() {
            window.location.reload();
        }, false);
        document.getElementById("data_button").addEventListener("click", function() {
            popitup("slideshow.html");
        }, false);
        document.getElementById("slider").addEventListener("click", function() {
            setSolution();
        }, false);
        document.getElementById("round-bottom-flask").addEventListener("click", function() {
            moveFlask();
        }, false);
        document.getElementById("pipette").addEventListener("click", function() {
            movePipette();
        }, false);
        document.getElementById("quartz_cuvette").addEventListener("click", function() {
            moveCuvette();
        }, false);
        document.getElementById("comp_trans_button").addEventListener("click", function() {
            scan();
        }, false);
        document.getElementById("spectrolid_trans_button").addEventListener("click", function() {
            spectrophotometer();
        }, false);
        document.getElementById("spectrolid_trans_button1").addEventListener("click", function() {
            spectrophotometer();
        }, false);
        document.getElementById("power_trans_button").addEventListener("click", function() {
            changeImage(); showClock();
        }, false);
        document.getElementById("start").addEventListener("click", function() {
            hideInstruction();
        }, false);
        document.getElementById("select").addEventListener("click", function() {
            selectGraph();
        }, false);
        document.getElementById("start_btn").addEventListener("click", function() {
            startBtn();
        }, false);
        document.getElementById("ok_btn").addEventListener("click", function() {
            okBtn();
        }, false);
        document.getElementById("disposegraph").addEventListener("click", function() {
            disposeGraph();
        }, false);
}

//This function is used to add mouse events to elements.
function mouseEvents(){
        document.getElementById("manual_button").addEventListener("mouseover", function(){
            this.src='../../common_images/hover_manual.png';
        });
        document.getElementById("manual_button").addEventListener("mouseout", function(){
            this.src='../../common_images/manual_button.png';
        });
        document.getElementById("data_button").addEventListener("mouseover", function(){
            this.src='../../common_images/hover_data.png';
        });
        document.getElementById("data_button").addEventListener("mouseout", function(){
            this.src='../../common_images/data_button.png';
        });
}

//This specifies the solution to be used when the input button is clicked
function setSolution(){
      document.getElementById("round-bottom-flask").src = "images/anthracene-sol.png";
      document.getElementById("demo").innerHTML = "Click on the volumetric flask containing solution to take it to the instrument table.";
}

// Call turnOn() method every 250ms
function changeImage() {
      setInterval("turnOn()", 250);
}

/* When the user switches on the spectrophotometer this method is called. Here the spectrophotometer image is 
changed continuously  to give the blinking light effect. The two images that are swapped is stored in images[] */
function turnOn() {
        /* Make the power button hidden, once the button is clicked to ensure that the spectrofluorimeter runs 
        only for one click. */
        document.getElementById('power_trans_button').style.visibility = 'hidden';
        // Get the image
        img = document.getElementById('table_with_spec');
        // Change the source of the image 
        img.src = images[x];
        //increment x;
        x++;
        if(x >= images.length){
            x = 0;
        }
        if(step_no==7 || step_no == 18){
            images[0] = "../../common_images/specfluor_on_no_redLight.png";
            images[1] = "../../common_images/specfluor_on_redLight.png";
        }
}

//Common function to make the clock visible and rotate it.
function clck(){
        // Get the images.
        context=document.getElementById('clockScreen');
        hand =document.getElementById('clockHand');
        // Make the visiblility of the obtained images visible
        context.style.visibility='visible';
        hand.style.visibility="visible";
        // Rotate 'clockHand' using jQueryRotate.js
        var angle=0;
        var id = setInterval(function(){
        angle+=1;
        if(angle==360){
            clearInterval(id);
        }
        $("#clockHand").rotate(angle);
        },30);

}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
/* This method displays a timer which runs for 30 seconds. There exists two images which are hidden initailly; 
when this method is called they are amde visible and the clock hand is made to rotate.  */
function showClock(){
        if(sol_name== 0 && step_no==7){
            clck();
            document.getElementById("demo").innerHTML = "Click on the lid of the sample chamber of the spectrophotometer by clicking on the lid for placing the sample in the cell holder;"
            //After 10 secs dispose clock
            setTimeout("removeClock()",5350);
        }
        else if(step_no == 7 || step_no==18){
            clck();
            document.getElementById("demo").innerHTML = "Open the lid of the sample chamber of the spectroflourimeter by clicking on the lid for placing the sample in the cell-holder."
            //After 10 secs dispose clock
            setTimeout("removeClock()",5350);
        }
}

// After 30 seconds of display of the timer the visibility of clock is changed back to hidden.
function removeClock() {
        if(step_no == 7||step_no == 18){
            context.style.visibility='hidden';
            hand.style.visibility="hidden";
            step_no++;
            cursorPointers('power_trans_button', 'spectrolid_trans_button');
        }
}

// First time its called to open the spectrophotometer
// Second time its called to close the spectrophotometer
function spectrophotometer(){
        if (sol_name == 0 && step_no == 8){
            // Replace the spectrophotometer images with the open spectrophotometer images
            images[0] = "../../common_images/spec_open.png";
            images[1] = "../../common_images/spec_open1.png";
            document.getElementById("demo").innerHTML = "Click on the cuvette top place it in the sample holder. One has to use pure solvent as the sample bank or reference in this measurement. Here a double beam spectrophotometer is shown.";
            step_no++;
            cursorPointers('spectrolid_trans_button', 'quartz_cuvette');
        }
        else if(sol_name == 0 && step_no == 10 && count == 10){
            // Replace the spectrophotometer images with the closed spectrophotmeter images.
            images[0] = "../../common_images/spec_close.png";
            images[1] = "../../common_images/spec_close1.png";
            document.getElementById("demo").innerHTML = "Open the measurement set-up screen by clicking on the absorption measurement icon on the computer monitor. ";
            step_no++;
            cursorPointers('spectrolid_trans_button1', 'comp_trans_button');
        }
        else if(step_no == 14){
            // Replace the spectrophotometer images with the open spectrophotometer images
            images[0] = "../../common_images/spec_open.png";
            images[1] = "../../common_images/spec_open1.png";
            document.getElementById("demo").innerHTML = "To take the cuvette out of the sample chamber, first click on the sample chamber lid to open it and then on the cuvette. ";
            step_no++;

        }
        else if(step_no == 15){
            //on click cuvettes comes out of spectrometer.One cuvette is removed and the other cuvette is placed on table.
            $("#ref_cuvette, #quartz_cuvette").show()
            $("#ref_cuvette").animate({left:'800px',top:'15px'},"slow", function(){
                this.remove();
            });
            $("#quartz_cuvette").animate({left:'290px', top:'338px'}, function(){
                count++;
            });
            document.getElementById("demo").innerHTML = "Close the sample chamber lid by clicking on it. ";
            step_no++;
            cursorPointers('spectrolid_trans_button','spectrolid_trans_button1');

        }
        else if(step_no == 16 && count == 11){
            // Replace the spectrophotometer images with the closed spectrophotmeter images.
            images[0] = "../../common_images/spec_close.png";
            images[1] = "../../common_images/spec_close1.png";
            document.getElementById('start').innerHTML = "Start Fluorescence measurement";
            document.getElementById("demo").innerHTML = "Click on the pop-up: 'Start Fluorescence measurement'";
            setTimeout( function(){
            $("#popup, #start").css("visibility", "visible");
            }, 700);
            step_no++;
            cursorPointers('spectrolid_trans_button1', 'start');
        }
        else if(step_no == 19||step_no == 8){
            // click on the lid for placing the sample in the cell-holder.
            // Replace the spectroflourimeter images with the open spectrophotometer images
            images[0] = "../../common_images/specfluor_open.png";
            images[1] = "../../common_images/specfluor_open1.png";
            document.getElementById("demo").innerHTML = "Click on the spectrophotometric quartz cuvette to transfer its content into an all-side-transparent quartz cuvette of path length 1 cm ×1 cm for the fluorescence measurement.";
            step_no++;
            cursorPointers('spectrolid_trans_button', 'quartz_cuvette');
        }
        else if((step_no == 21 && count == 13)||(step_no == 10)){
            // Replace the spectrophotometer images with the closed spectrophotmeter images.
            images[0] = "../../common_images/specfluor_on_redLight.png";
            images[1] = "../../common_images/specfluor_on_no_redLight.png";
            document.getElementById("demo").innerHTML = "Open the instrument set-up screen by clicking on the fluorescence measurement icon on the computer monitor.";
            step_no++;
            cursorPointers('spectrolid_trans_button1', 'comp_trans_button');
        }

}

// This method is used to play a video which shows constructing graphs based on their sample path length.
/*After the cuvettes are inserted into the spectrophotometer/spectroflurimeter, when the computer in pressed to scan,
  depending on the cuvette choosen form with an instruction is displayed.*/
function scan(){
        if(sol_name == 0 && step_no==11){
            document.getElementById('graph_instruction').innerHTML = "On the screen, enter the wavelength range: Start: 400 nm End: 260 nm. In real operation, the wavelength range of incident light for the sample is chosen and the wavelength scan is run via the accompanied computer software. One can run the scan in absorbance (A) or transmittance (%T) mode.";
            $(".data_validation, #instruction_bkgd, #graph_instruction").css("visibility", "visible");
            cursorPointers('comp_trans_button', 'start_btn');
            step_no++;
        }
        else if(step_no == 22||step_no ==11){
            document.getElementById("demo").innerHTML = "Select the Emission Scan Mode on the screen.On the screen, enter the Excitation wavelength: 360 nm, Emission Start Wavelength: 370 nm and Emission End wavelength: 460 nm. One chooses the Excitation Slit(nm) and Emission Slit(nm) values (here 5 nm/5 nm) and the scan speed value (here medium ) also.";
            $(".data_validation1, #popup").css("visibility", "visible");
            cursorPointers('comp_trans_button', 'ok_btn');
            step_no++;
        }
}

//This method is used to validate the data to display the absorption graphs for different samples.
function startBtn(){
        var input1 = document.getElementById("input1").value;
        var input2 = document.getElementById("input2").value;
        var video1 = document.getElementById("video1");
        if(sol_name == 0 && input1 == 400 && input2 == 260){
            $(".data_validation").css("visibility", "hidden");
            document.getElementById("graph_instruction").innerHTML = "Click on the close button when the spectral scal is complete. In real operation, the scan data are stored in the computer. The instrument stores data and therefore asks for the Sample File name. One enters a file name to save the data.";
            $("#popup, #video1").css("visibility", "visible");
            video1.play();
            cursorPointers('start_btn', 'disposegraph');
            step_no++;
        }
        else{
            alert("Enter start and end values and click start button on top of the window");
        }
}

//This method is used to select the specific mode from the dropdown menu.
function selectGraph() {
    dropdown = document.getElementById("select");
    dropdown.onchange = function(event){
       if(dropdown.value=="Excitation"){
         $("#select").html("<option value='Emission'>Emission</option><option value='Excitation'>Excitation</option>");
         alert("Select Emission scan mode");
       }
    }
}

//Common instructions for florescence graph validation.
function fluroscenceInstrc(){
        $(".data_validation1").css("visibility", "hidden");
        document.getElementById("demo").innerHTML = "Click on the close button when the spectral scal is complete. In real operation, the scan data are stored in the computer. The instrument stores data and therefore asks for the Sample File name. One enters a file name to save the data.";
        cursorPointers('ok_btn', 'disposegraph');
        step_no++;
}

//This method is used to validate the correct data and display emission graphs.
function okBtn(){
        //dropdown = document.getElementById("select");
        var input1 = document.getElementById("input1_data").value;
        var input2 = document.getElementById("input2_data").value;
        var input3 = document.getElementById("input3_data").value;
        var video2 = document.getElementById("video2");
        var video3 = document.getElementById("video3");
        var video4 = document.getElementById("video4");
        var video5 = document.getElementById("video5");
        if(sol_name == 0 && input1 == 360 && input2 == 370 && input3 == 460 ){
                fluroscenceInstrc();
                video2.style.visibility = "visible";
                video2.play();
        }
        else if(sol_name == 1 && input1 == 360 && input2 == 370 && input3 == 460){
                fluroscenceInstrc();
                video3.style.visibility = "visible";
                video3.play();
        }
        else if(sol_name == 2 && input1 == 360 && input2 == 370 && input3 == 460){
                fluroscenceInstrc();
                video4.style.visibility = "visible";
                video4.play();
        }
        else if(sol_name == 3 && input1 == 360 && input2 == 370 && input3 == 460){
                fluroscenceInstrc();
                video5.style.visibility = "visible";
                video5.play();
        }
        else{
                alert("Select Scanmode, EXWL,EM Start WL and EM End WL values");
        }
}

//This method makes the graph hidden once the video is played and close is pressed. 
function disposeGraph(){
        /* After playing the graph plotting video close option is choosen, the background scan image and 
            the video is mafde hidden. */
        if(sol_name==0 && step_no == 13){
            $(".videos, .common, #popup").css("visibility", "hidden");
            document.getElementById("demo").innerHTML = "To take the cuvette out of the sample chamber, first click on the sample chamber lid to open it and then on the cuvette. ";
            step_no++;
            cursorPointers('disposegraph', 'spectrolid_trans_button');
        }
        else if(step_no == 24||step_no == 13){
            $(".videos, #popup").css("visibility", "hidden");
            document.getElementById("demo").innerHTML = "Repeat the Emission scan measurement for the other the solutions.";
            document.getElementById('disposegraph').style.cursor = 'default';
        }
        else if(sol_name == 3 && step_no == 13){
            $(".videos, #popup").css("visibility", "hidden");
            document.getElementById("demo").innerHTML = "Reset to repeat the experiment.";
            document.getElementById('disposegraph').style.cursor = 'default';
        }

}