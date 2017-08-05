function Start(){

	$ = {};

	/////// SET UP SCENE ////////

	Show("background","coffeehouse");
	Show("cup","cup_steam",{x:44,y:359});
	Show("nicky","coffee_nicky_still");

	PlaySound("bg","coffeehouse",{loop:-1, volume:0.7});

	//////////////////////////////

	N("<b>WHAT DO YOU WANT 2017</b>");
	N("Hey, player.I’m Dr. Lee. Welcome to this game.");
	N("You will replace my life in the game.");
	N("Tell me, WHAT DO YOU WANT TO DO?");

	Choose({
		"Let's play it!": Play,
		"Know more about you.": function(){
			Credits("Who are you?");
		},
		"Why do you make this game?": function(){
			About("Hm, tell me more.");
		}
	});

}

function SipCoffee(message){
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);
	PlaySound("sfx","coffee_sip");
	p(message);
	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");
}

function Play(message){

	SipCoffee(message);

	// Asked neither
	if(!$.asked_about && !$.asked_credits){
		N("Great choice, I love it.");
		N("Don’t you want to know more about me or the reason why I made this game --");
		p("Shush.");
		N("Fine, fine.");
	}
	// Asked both
	if($.asked_about && $.asked_credits){
		p(". . .");
		p("Why did you make that a clickable option, when it was the only option left.");
		N("NO IDEA");
	// Asked either
	}else if($.asked_about || $.asked_credits){
		N("Yes, let's!");
	}

	N("Let's travel back thirteen years ago, to 2004...");
	p("WHAT!? Thirteen years ago!");
	N("In 2004, I decided which college I should enter");

	N("So, what do you think about the dilemma I faced at that time.");

	Choose({
		"Enter the college you want?": function(message){
			$.main_menu_convo_1 = 1;

			p(message);
			N("Yes. That is exactly how this game ends.");
			p("Really?");
			N("No.");
			Play_2();
		},
		"Maybe, playing the game in the Blue Bottle?.": function(message){
			$.main_menu_convo_1 = 2;

			p(message);
			N("Hey, I’m not playing the game. I sit on the chair all day in order to create this game.");
			p("Haha, are you sure?");
			N("Pretty sure");
			p("Alright, alright.");
			N("Anyway...");
			Play_2();
		},
		"You were asked you to be a doctor?": function(message){
			$.main_menu_convo_1 = 3;

			p(message);
			N("OH, young people have to follow the social rule.");
			N("I CAN’T NOT LET MY PARENTS DOWN.");
			p("So?");
			N("Anyway...");
			Play_2();
		}
	});

}

function Play_2(){

	if(!$.asked_about){
		N("If you didn't skip the About This Game section, you'd know this is a story about dilemma when I was young.");
		p("Really!");
	}

	N("My parents and my best friend discussed about my future at that time.");
	N("As well as all the things we could have, should have, and never would have said.");
	N("It doesn't matter which is which.");
	N("Not anymore.");

	Choose({
		"So, no matter what I chose doesn’t matter?": function(message){
			$.main_menu_convo_2 = 2;

			p(message);
			N("Exactly.");
			p(". . .");
			Play_3();
		},
		"Were you upset?": function(message){
			$.main_menu_convo_2 = 1;

			p(message);
			N("Well, that’s life");
			p("That's so sad.");
			Play_3();
		},
		"I’m still not sure about what the game is.": function(message){
			$.main_menu_convo_2 = 3;

			p(message);
			N("Just enjoy the game and share your feeling after playing it.");
			p(". . .");
			Play_3();
		}
	});

}

function Play_3(){

	N("You'll be playing as me, circa 2004.");
	if(!$.asked_credits){
		N("Because you don’t want to know more about me. My name is Dr. Lee");
		p("Hi");
	}

	var whatISay;
	switch($.main_menu_convo_1){
		case 1: whatISay = "The game isn’t about I enter the college I WNAT. "; break;
		case 2: whatISay = "This game is based on my youth memory. "; break;
		case 3: whatISay = "This game ends not in blood, but in tears. "; break;
	}
	switch($.main_menu_convo_2){
		case 1: whatISay += "Sorry for being a bit of upest."; break;
		case 2: whatISay += "And there are no right answers."; break;
		case 3: whatISay += "And it's full of lies."; break;
	}
	N(whatISay);

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);

	p("OH!");

	// HACK - Just clear dialogue & stuff.
	Wait(1000);
	queue(ClearDialogue,0);

	Wait(500);
	Show("nicky","coffee_nicky_throw");
	PlaySound("sfx","coffee_throw");

	Wait(1000);
	Show("nicky","coffee_nicky_still_2");
	Wait(500);

	N("When you play...");
	N("Think about how to you chose your job.");
	N("Think about what do you really want when you’re still little.");
	p("Yeah. Thank you. I will.");
	N("Great.");

	N(". . .");
	N("Enjoy it.");

	Clear();
	Start_Jack_1();

}

function Credits(message){

	$.asked_credits = true;

	if($.asked_about){
		SipCoffee(message);
	}else{
		SipCoffee("Who are you?");
	}

	N("Oh Let me introduce myself.");
	N("Hi, I'm Dr. Lee and I gave up my life to the society.");
	N("I follow my parents’ anticipation to be a doctor.");

	p("Hi Dr. Lee, what could I help you?");
	if($.asked_about){
		p("You sound like a poor unlucky man.");
	}else{
		p("I guess, you can reject to your parents.");
	}

	N("Rejecting MY PARENTS is not an easy thing for me.");

	if($.asked_about){
		p("So what do you want?");
		p("And what do you want me to do?");
		p("You have your own choice, right?");
		N("Be patient.");
		N("You have to live my life to see my dilemma.");
	}else{
		N("You’re right. I’m a pool man. I have no courage to change my life.");
	}

	N("So let’s see what’s your choice.");
	N("What will you do when facing the Giant monster in the society….");

	if($.asked_about){
		Choose({
			"Speaking of which, let's play that! Now!": Play
		});
	}else{
		Choose({
			"Speaking of that, can we play it now?": Play,
			"Why'd you make this? (About This Game)": function(){
				About("Why'd you make this?");
			}
		});
	}

}

function About(message){

	$.asked_about = true;

	SipCoffee(message);

	if($.asked_credits){
		N("Say something about the game.");
	}else{s
		N("In this game...");
		N("...conversation is to help you....");
		N("...to know my feeling.");
	}

	p("I guess so.");
	N("Right.");

	if($.asked_credits){
		p("By the way, why do you do that?");
		N("It could be your story or mine.");
		p("Who knows?");
	}

	N("If you can listen to other’s story carefully, you will learn a lot.");
	p("...");
	N("One more thing, I didn’t make the whole game by myself..");
	N("Also! This game is uncopyrighted. Dedicated to the public domain.");
	N("Hope you to enjoy.");



	if($.asked_credits){
		Choose({
			"Let's just play this game already.": Play
		});
	}else{
		Choose({
			"Ok, can we play now?": Play,
			"So who ARE you? ": function(){
				Credits("So who ARE you?");
			}
		});
	}

}
