const app = document.querySelector('#app');
const screens = [...document.querySelectorAll('[data-screen]')];
const backButton = document.querySelector('#backButton');
const helpButton = document.querySelector('#helpButton');
const installButton = document.querySelector('#install');
const toast = document.querySelector('#toast');
const armLeft = document.querySelector('#armLeft');
const armRight = document.querySelector('#armRight');
const title = document.querySelector('#moveTitle');
const maori = document.querySelector('#maoriCue');
const instruction = document.querySelector('#instruction');
const comfortCue = document.querySelector('#comfortCue');
const stepCount = document.querySelector('#stepCount');
const playButton = document.querySelector('#play');
const progress = document.querySelector('#progress');
const time = document.querySelector('#time');
const modeLabel = document.querySelector('#modeLabel');
const gardenBar = document.querySelector('#gardenBar');
const gardenPercent = document.querySelector('#gardenPercent');
const audioFile = document.querySelector('#audioFile');
const audioName = document.querySelector('#audioName');
const syncStatus = document.querySelector('#syncStatus');
const motionSymbol = document.querySelector('#motionSymbol');
const bpmLabel = document.querySelector('#bpmLabel');
const trackHint = document.querySelector('#trackHint');
const coachVideo = document.querySelector('#coachVideo');
const performerWrap = document.querySelector('#performerWrap');
const bundledCoachParts=['assets/video/toia-ai-coach-2min.mp4.part1','assets/video/toia-ai-coach-2min.mp4.part2'];
let defaultCoachSrc='',defaultCoachObjectUrl=null,bundledCoachPromise=null;
const poseLayers = [...document.querySelectorAll('.pose-layer')];
const instructorLabel = document.querySelector('.instructor-label');
const coachPhase = document.querySelector('#coachPhase');
const coachModeCue = document.querySelector('#coachModeCue');
const sessionMode = document.querySelector('#sessionMode');
const mirrorMode = document.querySelector('#mirrorMode');
const growthCelebration = document.querySelector('#growthCelebration');
const growthMessage = document.querySelector('#growthMessage');
const sessionTokens = document.querySelector('#sessionTokens');
const rewardTitle = document.querySelector('#rewardTitle');
const rewardTokens = document.querySelector('#rewardTokens');
const rewardMessage = document.querySelector('#rewardMessage');
const openRewardGarden = document.querySelector('#openRewardGarden');
const savePlantLater = document.querySelector('#savePlantLater');
const gardenCanvas = document.querySelector('#gardenCanvas');
const gardenCatalogue = document.querySelector('#gardenCatalogue');
const builderTokens = document.querySelector('#builderTokens');
const builderEyebrow = document.querySelector('#builderEyebrow');
const builderTitle = document.querySelector('#builderTitle');
const builderSubtitle = document.querySelector('#builderSubtitle');
const builderProgress = document.querySelector('#builderProgress');
const placementHint = document.querySelector('#placementHint');
const placementGrowth = document.querySelector('#placementGrowth');
const undoGarden = document.querySelector('#undoGarden');
const gardenSound = document.querySelector('#gardenSound');
const voxelGardenCanvas = document.querySelector('#voxelGardenCanvas');
const gardenBackdropImage = new Image();
let gardenBackdropReady=false;
gardenBackdropImage.decoding='async';gardenBackdropImage.src='assets/garden/garden-world-v51.png';
gardenBackdropImage.addEventListener('load',()=>{gardenBackdropReady=true;if(state.screen==='builder'){renderVoxelGarden(performance.now());ensureVoxelAnimation()}});
const gardenSpriteSheet = new Image();
let gardenSpritesReady=false;
gardenSpriteSheet.decoding='async';gardenSpriteSheet.src='assets/garden/garden-sprites-v55.png';
gardenSpriteSheet.addEventListener('load',()=>{gardenSpritesReady=true;if(state.screen==='builder'){renderGardenBuilder();ensureVoxelAnimation()}});
const gardenAccessorySheet = new Image();
let gardenAccessoriesReady=false;
gardenAccessorySheet.decoding='async';gardenAccessorySheet.src='assets/garden/garden-accessories-v55.png';
gardenAccessorySheet.addEventListener('load',()=>{gardenAccessoriesReady=true;if(state.screen==='builder'){renderGardenBuilder();ensureVoxelAnimation()}});
const voxelSelectionLabel = document.querySelector('#voxelSelectionLabel');
const voxelActionBar = document.querySelector('#voxelActionBar');
const voxelActionButtons = [...document.querySelectorAll('[data-garden-action]')];
const easyGardenTitle = document.querySelector('#easyGardenTitle');
const easyGardenHelp = document.querySelector('#easyGardenHelp');
const easyGrowthSteps = document.querySelector('#easyGrowthSteps');
const easyGardenAction = document.querySelector('#easyGardenAction');
const gardenSurprise = document.querySelector('#gardenSurprise');
const moreGardenChoices = document.querySelector('#moreGardenChoices');
const voxelSelectedTitle = document.querySelector('#voxelSelectedTitle');
const voxelSelectedState = document.querySelector('#voxelSelectedState');
const gardenChoiceTitle = document.querySelector('#gardenChoiceTitle');
const gardenChoiceHelp = document.querySelector('#gardenChoiceHelp');
const gardenCollection = document.querySelector('#gardenCollection');
const gardenCollectionPanel = document.querySelector('#gardenCollectionPanel');
const addToGarden = document.querySelector('#addToGarden');
const openGardenCollection = document.querySelector('#openGardenCollection');
const gardenDrawer = document.querySelector('#gardenDrawer');
const closeGardenDrawer = document.querySelector('#closeGardenDrawer');
const gardenCategories = document.querySelector('#gardenCategories');
const drawerTokens = document.querySelector('#drawerTokens');
const gardenObjectMenu = document.querySelector('#gardenObjectMenu');
const gardenObjectName = document.querySelector('#gardenObjectName');
const moveGardenObject = document.querySelector('#moveGardenObject');
const rotateGardenObject = document.querySelector('#rotateGardenObject');
const removeGardenObject = document.querySelector('#removeGardenObject');
const gardenObjectInfo = document.querySelector('#gardenObjectInfo');
const gardenPlacementPanel = document.querySelector('#gardenPlacementPanel');
const gardenPreviewName = document.querySelector('#gardenPreviewName');
const gardenPreviewHelp = document.querySelector('#gardenPreviewHelp');
const placeGardenChoice = document.querySelector('#placeGardenChoice');
const cancelGardenChoice = document.querySelector('#cancelGardenChoice');
const gardenViewLeft = document.querySelector('#gardenViewLeft');
const gardenViewRight = document.querySelector('#gardenViewRight');
const gardenZoomOut = document.querySelector('#gardenZoomOut');
const gardenZoomIn = document.querySelector('#gardenZoomIn');
const gardenViewReset = document.querySelector('#gardenViewReset');
const turnCard = document.querySelector('#turnCard');
const turnName = document.querySelector('#turnName');
const lyricLine = document.querySelector('#lyricLine');
const lyricsInput = document.querySelector('#lyricsInput');
const lyricMaori = document.querySelector('#lyricMaori');
const lyricEnglish = document.querySelector('#lyricEnglish');

// Keep the coach image unobstructed: move settings, progress and instructions
// out of the video stage and into the control panel below it.
const sessionControlsPanel = document.querySelector('.session-controls');
const sessionChoicesPanel = document.querySelector('.session-choices');
const sessionCuePanel = document.querySelector('.session-stage .cue-card');
const sessionProgressPanel = document.querySelector('.session-stage .garden-progress');
const sessionTokenPanel = document.querySelector('.session-stage .session-token-pill');
if(sessionControlsPanel&&sessionChoicesPanel&&sessionCuePanel&&sessionProgressPanel&&sessionTokenPanel){
  const sessionProgressRow=document.createElement('div');sessionProgressRow.className='session-progress-row';
  sessionProgressRow.append(sessionProgressPanel,sessionTokenPanel);
  sessionControlsPanel.prepend(sessionCuePanel);
  sessionControlsPanel.prepend(sessionProgressRow);
  sessionControlsPanel.prepend(sessionChoicesPanel);
  if(coachModeCue)sessionChoicesPanel.append(coachModeCue);
}

const steps = [
  {m:'Te tīmatanga',t:'Awaken the garden · Whakaara te māra',i:'Lift the hands gently from your sides, open them like a flower, then return them to your thighs.',c:'Relax the shoulders · Whakangā ngā pakihiwi.',l:-50,r:50,fx:'heart'},
  {m:'Whakarongo!',t:'Listen · Whakarongo',i:'Place the right hand, then the left hand beside the ear. Return both hands to the heart.',c:'Tilt the head only a little · Kia āta neke te māhunga.',l:-125,r:125},
  {m:'Ki te reo Māori e karanga nei',t:'The call of te reo Māori · Te karanga o te reo',i:'Open the hands from the mouth, receive the call, then bring both hands back to the heart.',c:'Standing option: take only one small step.',l:-82,r:82,heart:true},
  {m:'Ki ngā akoranga rangatira',t:'Receive the teachings · Whiwhi i ngā akoranga',i:'Hold the palms together like a closed book, open them gently and receive the knowledge.',c:'The elbows may stay close to the body.',l:-68,r:68},
  {m:'Nā te Atua i tuku iho ki a tātou',t:'Receive from above · Tuku iho',i:'Raise the hands only to a comfortable shoulder height, then lower them gently to the chest.',c:'For sore shoulders, lift only to chest height.',l:-145,r:145},
  {m:'Pupuritia, kōrerotia mō ake tonu',t:'Hold, speak and continue · Pupuritia, kōrerotia',i:'Hands to the heart, then open from the mouth and finish with a gentle circle.',c:'Keep the wiri soft and free of strain.',l:-95,r:95,heart:true,wiri:true},
  {m:'Tirohia!',t:'Look · Tirohia',i:'Bring the palms near the eyes, then open them gently towards the front.',c:'Let the eyes follow; do not turn the head far.',l:-112,r:112},
  {m:'Ngā tikanga tapu a ngā tīpuna',t:'From ancestors to the future · Ngā tīpuna',i:'Hands to the heart, gesture behind the shoulders, then carry the knowledge forward.',c:'This movement requires cultural review before final use.',l:42,r:-42},
  {m:'Kapohia, hei oranga ngākau',t:'For the wellbeing of the heart · Oranga ngākau',i:'Gather something precious, bring it to the heart, then take one gentle breath.',c:'Pause if you feel dizzy · Tatari mēnā ka ānini.',l:-38,r:38,heart:true},
  {m:'Whiua ki te ao · ki te rangi · ki ngā iwi katoa',t:'Share the message · Whiua te kōrero',i:'Open the arms to each side at chest height, then only as high as feels comfortable.',c:'No full turns, jumping or stamping.',l:-158,r:158},
  {m:'Kaua rawatia e tukua e · Kia memeha e',t:'Do not let it fade · Kaua e memeha',i:'Place the palms gently forward, then gather the message back to the heart.',c:'Keep breathing · Kia hā tonu.',l:-72,r:72,heart:true},
  {m:'Whakarongo',t:'Finish · Whakamutunga',i:'Right ear, left ear, both hands to the heart, then open the hands like a flower.',c:'Finish with a smile and a gentle breath.',l:-125,r:125,heart:true}
];
const movementSymbols=['🌼','👂','🗣️','📖','↓','♾️','👀','↝','💚','↗','🫶','🌿'];

// Complete lyric order. Each weight reflects the relative sung phrase length.
let cues = [
  {step:1,w:4,m:'Whakarongo!'},
  {step:2,w:8,m:'Ki te reo Māori e karanga nei'},
  {step:1,w:4,m:'Whakarongo!'},
  {step:3,w:8,m:'Ki ngā akoranga rangatira'},
  {step:4,w:12,m:'Nā te Atua i tuku iho ki a tātou e'},
  {step:5,w:12,m:'Pupuritia, kōrerotia mō ake tonu'},
  {step:6,w:4,m:'Tirohia!'},
  {step:7,w:10,m:'Ngā tikanga tapu a ngā tīpuna'},
  {step:8,w:4,m:'Kapohia'},
  {step:8,w:8,m:'Hei oranga ngākau — auē'},
  {step:9,w:4,m:'Whiua ki te ao'},
  {step:9,w:4,m:'Whiua ki te rangi'},
  {step:9,w:8,m:'Whiua ki ngā iwi katoa'},
  {step:10,w:8,m:'Kaua rawatia e tukua e'},
  {step:10,w:6,m:'Kia memeha e'},
  {step:1,w:4,m:'Whakarongo!'},
  {step:2,w:8,m:'Ki te reo Māori e karanga nei'},
  {step:1,w:4,m:'Whakarongo!'},
  {step:3,w:8,m:'Ki ngā akoranga rangatira'},
  {step:4,w:10,m:'Tēnā kia purea te hau ora e'},
  {step:7,w:10,m:'He kupu tuku iho mō tēnei reanga'},
  {step:7,w:10,m:'He kupu tuku iho mō tēnei reanga'},
  {step:11,w:4,m:'Whakarongo!'},
  {step:11,w:6,m:'Tō reo whakarongo!'}
];
const whakarongoCues=[...cues];
// Beat-led routine used only when the uploaded file is Mahasti's Dele Koochooloo.
// Every phrase is an eight-count; cueStarts() fits it to the uploaded version.
const deleKoochoolooCues=[
  {step:0,w:8,m:'Gentle opening',t:'Ready and relaxed',i:'Pulse the shoulders gently to the beat and open the hands like a flower.',c:'Keep the movement small and fluid.'},
  {step:9,w:8,m:'Open and close',t:'Arms to the sides',i:'Take two gentle steps right and left, opening the arms on every second beat.',c:'Seated option: shift your weight from side to side.'},
  {step:8,w:8,m:'Dele Koochooloo',t:'Hands to heart',i:'Hands to the heart for two beats, then reach forward for two beats. Repeat.',c:'Keep the movement soft with the melody.'},
  {step:5,w:8,m:'Hand wave',t:'Wave from the heart',i:'Wave the hands outward from the heart, adding a gentle wrist movement every four beats.',c:'Keep the elbows loose and shoulders down.'},
  {step:9,w:8,m:'Right, left, together',t:'Side steps',i:'Right, together, left, together; open the opposite arm with each step.',c:'Use short steps and avoid full turns.'},
  {step:6,w:8,m:'Look and point',t:'Follow the hands',i:'Point right for four beats, then left for four beats. Let the eyes follow the hands.',c:'Avoid turning the neck too far.'},
  {step:8,w:8,m:'Dele Koochooloo',t:'Heart and smile',i:'Bring the hands to the heart, then open them gently forward. Repeat twice in eight beats.',c:'Take one easy breath between movements.'},
  {step:7,w:8,m:'Gentle circle',t:'Circle the hands',i:'Draw one soft circle in front of the body every four beats and shift your weight with it.',c:'Keep the circle within a comfortable shoulder range.'},
  {step:9,w:8,m:'Chorus',t:'Open, lift, lower',i:'Open the arms, lift to shoulder height, open again, then return to the heart.',c:'Keep the hands lower if the shoulders feel uncomfortable.'},
  {step:5,w:8,m:'Wave and pulse',t:'Small wrist waves',i:'Wave the hands outward for four beats, then return them to the heart for four beats.',c:'Keep the wrist movement very light.'},
  {step:9,w:8,m:'Side steps',t:'Right and left',i:'Take two steps right and two steps left, then return along the same path.',c:'Seated option: use the knees and toes instead of steps.'},
  {step:8,w:8,m:'Dele Koochooloo',t:'Heart and reach',i:'Keep one hand on the heart and reach the other outward. Switch hands after four beats.',c:'Keep the body facing forward.'},
  {step:7,w:8,m:'Musical bridge',t:'Free arm movement',i:'Move the arms through two large, gentle arcs and gather them on the eighth beat.',c:'Choose any range that feels comfortable.'},
  {step:9,w:8,m:'Final chorus',t:'Open with energy',i:'Perform the open, lift, open, heart pattern twice with a clear pulse.',c:'Add energy without jumping.'},
  {step:5,w:8,m:'Shimmer',t:'Wrists and smile',i:'Keep the arms open and pulse the wrists on the smaller beats, then return to the heart.',c:'Keep breathing normally.'},
  {step:11,w:8,m:'Finish',t:'Gentle ending',i:'Make the movements smaller, bring the hands to the heart, then open like a flower on the final beat.',c:'Hold the ending and take one gentle breath.'}
];
const tutiraCues=[
  // English meanings require cultural review before production use.
  {step:2,w:8,m:'Tūtira mai ngā iwi',en:'Stand together, people',t:'Invite everyone'},
  {step:8,w:8,m:'Tātou, tātou e',en:'All of us, all of us',t:'Gather together'},
  {step:2,w:8,m:'Tūtira mai ngā iwi',en:'Stand together, people',t:'Invite everyone again'},
  {step:8,w:8,m:'Tātou, tātou e',en:'All of us, all of us',t:'Gather together'},
  {step:6,w:8,m:'Whāia te māramatanga',en:'Seek understanding',t:'Seek understanding'},
  {step:8,w:8,m:'Me te aroha, e ngā iwi!',en:'And love, people!',t:'Share aroha'},
  {step:3,w:8,m:'Kia tapatahi',en:'Be united',t:'Come together'},
  {step:9,w:8,m:'Kia kotahi rā',en:'Be as one',t:'Move as one'},
  {step:11,w:8,m:'Tātou, tātou e',en:'All of us, all of us',t:'Finish together'}
];
const tutiraSeatedInstructions=[
  'Sit tall and open both hands to invite everyone in.',
  'Gather both hands gently to the centre: all of us together.',
  'Open the arms again, this time slightly wider.',
  'Bring the hands back together at the heart.',
  'Bring the hands near the eyes, then open them forward.',
  'Touch the heart, then share both hands toward the group.',
  'Bring the palms together and keep both feet supported.',
  'Open both arms in one smooth circle while seated.',
  'Gather the hands to the heart and finish with a smile.'
];
const tutiraStandingInstructions=[
  'Open both hands and take one small step to invite everyone in.',
  'Step to centre and gather both hands: all of us together.',
  'Open the arms again with one small step to the other side.',
  'Return to centre and bring the hands to the heart.',
  'Bring the hands near the eyes, then reach forward gently.',
  'Touch the heart, then share both hands toward the group.',
  'Bring the palms together and settle both feet.',
  'Take two small side steps while opening the arms as one.',
  'Step to centre, gather the hands to the heart and smile.'
];
const teArohaCues=[{step:8,w:8,m:'Aroha · Heart'},{step:2,w:8,m:'Offer kindness'},{step:8,w:8,m:'Return to heart'},{step:5,w:8,m:'Share gently'},{step:3,w:8,m:'Receive'},{step:8,w:8,m:'Hold close'},{step:2,w:8,m:'Open forward'},{step:5,w:8,m:'Soft wave'},{step:8,w:8,m:'Heart and breath'},{step:9,w:8,m:'Open with care'},{step:8,w:8,m:'Return to heart'},{step:11,w:8,m:'Gentle finish'}];
const teArohaSeatedInstructions=[
  'Sit supported and place both hands softly over the heart.',
  'Offer one open hand forward, then bring it back comfortably.',
  'Return both hands to the heart and relax the shoulders.',
  'Send a small, gentle hand wave outward from the heart.',
  'Rest the palms open above the thighs to receive with care.',
  'Bring the hands close to the chest without squeezing.',
  'Open both palms forward at chest height, keeping the elbows soft.',
  'Wave one hand, then the other, while both feet stay supported.',
  'Hands to heart; take one easy breath without holding it.',
  'Open the arms only as wide as feels comfortable.',
  'Return the hands to the heart and lower the shoulders.',
  'Rest both hands on the thighs and finish with a gentle smile.'
];
const teArohaStandingInstructions=[
  'Stand with feet comfortably apart and place both hands over the heart.',
  'Take one small step right while offering an open hand.',
  'Return to centre and bring both hands back to the heart.',
  'Take one small step left with a soft outward hand wave.',
  'Step together and hold both palms open in front of the body.',
  'Shift the weight gently while bringing the hands close to the heart.',
  'Take one small forward step and open both palms at chest height.',
  'Step back to centre and wave one hand, then the other.',
  'Keep both feet still, hands at the heart, and take an easy breath.',
  'Take two small side steps while opening the arms comfortably.',
  'Return to centre and bring both hands to the heart.',
  'Plant both feet, lower the hands, and finish with a smile.'
];
const eToruCues=[{step:0,w:8,m:'One · Open'},{step:3,w:8,m:'Two · Receive'},{step:8,w:8,m:'Three · Heart'},{step:2,w:8,m:'Hope · Reach'},{step:3,w:8,m:'Faith · Receive'},{step:8,w:8,m:'Love · Heart'},{step:0,w:8,m:'One · Open'},{step:3,w:8,m:'Two · Receive'},{step:8,w:8,m:'Three · Heart'},{step:9,w:8,m:'Share all three'},{step:8,w:8,m:'Love is greatest'},{step:11,w:8,m:'Finish'}];
const eToruSeatedInstructions=[
  'Sit tall and open the right hand for one.',
  'Open the left hand as well for two; keep both elbows close.',
  'Bring both open hands gently to the heart for three.',
  'Reach both hands forward only to a comfortable distance for hope.',
  'Turn the palms upward near the body to receive with faith.',
  'Bring both hands back to the heart for love.',
  'Repeat one with a small right-hand opening.',
  'Repeat two by opening the left hand beside it.',
  'Repeat three by gathering both hands to the heart.',
  'Share all three with one small outward circle of both hands.',
  'Return to the heart and let the shoulders soften.',
  'Lower the hands to the thighs and finish with both feet supported.'
];
const eToruStandingInstructions=[
  'Open the right hand and tap the right toe once for one.',
  'Open the left hand and tap the left toe once for two.',
  'Bring both feet to centre and both hands to the heart for three.',
  'Take one small forward step and reach comfortably for hope.',
  'Step back, turn the palms upward, and receive with faith.',
  'Settle both feet and bring the hands to the heart for love.',
  'Repeat one with a small right side step.',
  'Repeat two with a small left side step.',
  'Return to centre and gather both hands for three.',
  'Take two small side steps while drawing one soft outward circle.',
  'Plant both feet and return the hands to the heart.',
  'Lower the hands, keep the knees soft, and finish still.'
];
const toiaCues=[
  // English meanings require cultural review before production use.
  {step:7,w:8,m:'Whakaritea',en:'Get ready',t:'Ready the waka'},
  {step:5,w:8,m:'Toia mai',en:'Pull it this way',t:'Pull the waka'},
  {step:9,w:8,m:'Te waka',en:'The canoe',t:'Pull right and left'},
  {step:8,w:8,m:'Ki te urunga',en:'To its resting place',t:'Gather the rope'},
  {step:5,w:8,m:'Toia mai',en:'Pull it this way',t:'Pull together'},
  {step:9,w:8,m:'Hui e',en:'Gather together',t:'Move as one'},
  {step:7,w:8,m:'Tāiki e',en:'Joined as one',t:'Reach and draw in'},
  {step:8,w:8,m:'Hui e',en:'Gather together',t:'Gather to the heart'},
  {step:5,w:8,m:'Toia mai',en:'Pull it this way',t:'Strong gentle pull'},
  {step:9,w:8,m:'Te waka nei',en:'This canoe',t:'Two side pulls'},
  {step:8,w:8,m:'Hui e',en:'Gather together',t:'Come together'},
  {step:11,w:8,m:'Tāiki e!',en:'Joined as one!',t:'Finish together'}
];
const toiaSeatedInstructions=[
  'Sit tall. Hold an imaginary rope with both hands.',
  'Reach forward, close both hands, then pull to your ribs.',
  'Pull once to the right, then once to the left. Keep both feet supported.',
  'Circle both hands inward and gather the rope to your chest.',
  'Repeat two gentle forward-and-back pulls with the group.',
  'Open both arms, then bring everyone together at the centre.',
  'Reach diagonally forward and draw both hands back to your body.',
  'Gather both hands to the heart and sit tall.',
  'Pull forward and back twice, using only a comfortable range.',
  'Pull right and left while gently tapping alternate toes.',
  'Open the arms and gather them back to the heart.',
  'Lift the hands together, bring them to the heart and smile.'
];
const toiaStandingInstructions=[
  'Stand tall. Hold an imaginary rope with both hands.',
  'Step forward slightly, take the rope, then pull it to your ribs.',
  'Pull to the right, then left, shifting your weight gently.',
  'Circle both hands inward and step back to gather the rope.',
  'Take two small steps in place with two gentle pulls.',
  'Open both arms, step to centre and move as one.',
  'Reach diagonally forward, then draw the rope back with one small step.',
  'Bring both hands to the heart and settle your feet.',
  'Repeat two clear pulls, bending the knees only a little.',
  'Take two small side steps while pulling right and left.',
  'Step to centre, open the arms and gather together.',
  'Plant both feet, lift the hands, return to the heart and smile.'
];
const PRACTICE_DURATION_MS=2*60*1000;
const MEDIA_END_TOLERANCE_MS=250;
const tracks={
  whakarongo:{name:'Whakarongo',bpm:70,duration:PRACTICE_DURATION_MS,cues:whakarongoCues,tutor:true,coach:false,requiresAudio:true},
  tutira:{name:'Tūtira Mai Ngā Iwi',bpm:72,duration:PRACTICE_DURATION_MS,cues:tutiraCues,tutor:true,coach:false,requiresAudio:true},
  tearoha:{name:'Te Aroha',bpm:66,duration:PRACTICE_DURATION_MS,cues:teArohaCues,tutor:true,coach:false,requiresAudio:true},
  etoru:{name:'E Toru Ngā Mea',bpm:68,duration:PRACTICE_DURATION_MS,cues:eToruCues,tutor:true,coach:false,requiresAudio:true},
  toia:{name:'Toia – Hunga Roia 2017',bpm:100,duration:PRACTICE_DURATION_MS,cues:toiaCues,tutor:true,coach:true,soundtrack:true,coachStart:0}
};
const poseForStep=['share','listen','share','receive','receive','heart','listen','heart','heart','share','heart','share'];
const shortInstructions=[
  'Open your hands gently like a flower.',
  'Bring one hand to your ear, then to your heart.',
  'Open both hands forward and return to your heart.',
  'Open your palms like a book.',
  'Lift your hands only to a comfortable height.',
  'Touch your heart, then wave gently forward.',
  'Bring your hands near your eyes, then open them.',
  'Reach softly behind, then carry the movement forward.',
  'Gather your hands and bring them to your heart.',
  'Open both arms gently to the sides.',
  'Press forward softly, then return to your heart.',
  'Finish with hands to heart and a gentle smile.'
];
const seatedInstructions=[
  'Sit tall and open your hands gently.',
  'Stay seated. Bring one hand to your ear, then your heart.',
  'Open both hands forward. Keep both feet resting.',
  'Open your palms like a book while seated.',
  'Lift your hands to a comfortable height. Keep your feet still.',
  'Touch your heart, then wave gently. No stepping.',
  'Bring your hands near your eyes, then open them.',
  'Reach softly behind each shoulder while seated.',
  'Gather your hands to your heart and breathe.',
  'Open both arms. Tap your toes instead of stepping.',
  'Press forward softly, then return to your heart.',
  'Finish seated with hands to heart and a smile.'
];
const standingInstructions=[
  'Stand tall, open your hands and shift your weight gently.',
  'Bring one hand to your ear, then your heart. Sway softly.',
  'Open both hands forward with one small step.',
  'Open your palms like a book and shift your weight.',
  'Lift your hands comfortably and stand tall.',
  'Touch your heart, wave forward and step gently in place.',
  'Bring your hands near your eyes. Keep your feet steady.',
  'Reach softly behind, then take one small step forward.',
  'Gather your hands to your heart and shift your weight.',
  'Open both arms and take two small side steps.',
  'Press forward softly, then step back to centre.',
  'Finish standing with feet still, hands to heart and a smile.'
];

const routineInstructions={
  whakarongo:{byStep:true,seated:seatedInstructions,standing:standingInstructions},
  tutira:{seated:tutiraSeatedInstructions,standing:tutiraStandingInstructions},
  tearoha:{seated:teArohaSeatedInstructions,standing:teArohaStandingInstructions},
  etoru:{seated:eToruSeatedInstructions,standing:eToruStandingInstructions},
  toia:{seated:toiaSeatedInstructions,standing:toiaStandingInstructions}
};
const routineReadyInstructions={
  whakarongo:{seated:'Sit comfortably. Begin with one hand ready to listen beside the ear.',standing:'Stand with support nearby. Begin with a gentle listening gesture.'},
  tutira:{seated:'Sit comfortably and get ready to invite everyone with open hands.',standing:'Stand comfortably and get ready to move together with small side steps.'},
  tearoha:{seated:'Sit supported with relaxed hands ready to move from the heart.',standing:'Stand with feet apart and prepare for gentle heart-and-offer steps.'},
  etoru:{seated:'Sit tall with both feet supported, ready for the one-two-three hand pattern.',standing:'Stand with support nearby, ready for small one-two-three toe taps.'},
  toia:{seated:'Sit comfortably and hold the imaginary rope with both hands.',standing:'Stand comfortably and get ready for small, grounded pulling steps.'}
};

const state = {screen:'home',movement:'seated',people:'solo',track:'whakarongo',rate:1,mirror:true,gameMode:'solo',challengeType:'individual',builderMode:'solo'};
let historyStack = ['home'];
let index = -1, playing = false, startedAt = 0, carried = 0, raf, audio, installPrompt;
let audioContext, nextBeat = 0, beatTimer, sessionRecorded = false;
let syncOffset = 4200, detectedBpm = 70, customRoutine = '', lastCoachSync = 0, lastMediaSync = 0;
let customCoachVideoUrl=null;
let pendingAutoStartTrack=null;
const uploadedSongFiles=new Map();
const growthMilestones=[3,7,11,15,19],shownGrowth=new Set(),boundPracticeMedia=new WeakSet();
let sessionTokensEarned=0,sessionRewardGranted=false,rewardNext='builder';
let selectedVoxelCell={x:4,y:3},voxelChoiceMode=null,voxelAnimationFrame=null,voxelLastFrame=0;
let voxelParticles=[];
let gardenAppearances=[];
let openGardenAfterReward=false;
const gardenCamera={zoom:1,panX:0};
const gardenEditor={mode:'idle',choice:null,source:null,category:'plants',collection:false,previewPosition:null,previewRotation:0,target:null,previewValid:false,hasDragged:false,dragPointerId:null,dragOffset:null};
let gardenSoundEnabled=localStorage.getItem('sharedGardenSounds')!=='off';
const voxelUndoStack=[];
const VOXEL_COLS=9,VOXEL_ROWS=7;
const sessionRewards={solo:20,competition:50,cooperation:50};
const GROWTH_STAGES=[
  'Empty soil · He oneone wātea',
  'Seed · Kākano',
  'Small sprout · Tipu iti',
  'Growing plant · Tipu haere',
  'Mature plant · Tipu pakeke',
  'Ready to harvest · Kua rite ki te hauhake'
];
const voxelPlants={
  kumara:{name:'Kūmara',maori:'Kūmara',price:2,yield:2,leaf:'#4f984c',accent:'#8d5278'},
  carrot:{name:'Carrot',maori:'Kāreti',price:1,yield:2,leaf:'#62a94c',accent:'#e8823e'},
  tomato:{name:'Tomato',maori:'Tōmato',price:2,yield:3,leaf:'#438b49',accent:'#d95745'},
  sunflower:{name:'Sunflower',maori:'Putirā',price:2,yield:1,leaf:'#4e9145',accent:'#efc84a'},
  herbs:{name:'Herbs',maori:'Otaota kakara',price:1,yield:2,leaf:'#4f9b66',accent:'#8dc56f'},
  nativeFlowers:{name:'Native flowers',maori:'Putiputi taketake',price:2,yield:1,leaf:'#4e9155',accent:'#e8765c',theme:true}
};
const voxelBuildChoices=[
  {id:'soil',name:'Soil plot',maori:'Papa whakatō',price:1},
  {id:'raised',name:'Raised garden bed',maori:'Pouaka māra',price:3},
  {id:'wood-path',name:'Wooden path',maori:'Ara rākau',price:1},
  {id:'stone-path',name:'Stone path',maori:'Ara kōhatu',price:2},
  {id:'water',name:'Water block',maori:'Wai',price:2}
];
const voxelDecorations=[
  {id:'tree',name:'Garden tree',maori:'Rākau māra',price:4},
  {id:'kowhai',name:'Kōwhai tree',maori:'Kōwhai',price:4,theme:true},
  {id:'bench',name:'Garden bench',maori:'Tūru māra',price:3},
  {id:'fence',name:'Garden fence',maori:'Taiapa māra',price:1},
  {id:'flower-patch',name:'Flower patch',maori:'Pātiki putiputi',price:2},
  {id:'bird-bath',name:'Bird bath',maori:'Kaukau manu',price:2},
  {id:'planter',name:'Flower planter',maori:'',price:2},
  {id:'watering-can',name:'Watering can',maori:'',price:1},
  {id:'potted-shrub',name:'Potted native shrub',maori:'',price:3,theme:true},
  {id:'garden-pot',name:'Garden pot',maori:'',price:1},
  {id:'shared-marker',name:'Māra Tahi marker',maori:'Tohu māra tahi',price:3,theme:true}
];
const gardenSpriteCells={kumara:[0,0],carrot:[1,0],tomato:[2,0],sunflower:[3,0],herbs:[0,1],nativeFlowers:[1,1],tree:[2,1],kowhai:[2,1],bench:[3,1],fence:[0,2],'flower-patch':[1,2],'bird-bath':[2,2],'shared-marker':[3,2]};
const gardenAccessoryCells={planter:[0,0],'watering-can':[1,0],'potted-shrub':[0,1],'garden-pot':[1,1]};
const gardenCategoryChoices={
  plants:[['plant','herbs'],['plant','sunflower'],['plant','nativeFlowers'],['decorate','potted-shrub']],
  flowers:[['plant','sunflower'],['plant','nativeFlowers'],['decorate','flower-patch']],
  vegetables:[['plant','kumara'],['plant','carrot'],['plant','tomato']],
  native:[['plant','nativeFlowers'],['decorate','kowhai'],['decorate','potted-shrub'],['decorate','shared-marker']],
  trees:[['decorate','tree'],['decorate','kowhai']],
  furniture:[['decorate','bench'],['decorate','planter'],['decorate','watering-can'],['decorate','bird-bath']],
  paths:[['build','stone-path'],['build','wood-path'],['build','raised']],
  decorations:[['decorate','planter'],['decorate','garden-pot'],['decorate','watering-can'],['decorate','flower-patch'],['decorate','bird-bath'],['decorate','shared-marker'],['decorate','fence']]
};
const STORAGE_KEY='sharedGardenPrototypeV3';
const defaultPrototypeData={
  profile:{name:'Aroha',level:3,sessions:4,tokens:65},sharedTokens:80,competitionBudget:50,turn:0,votes:{'Aroha’s Garden':2,'Rimu Team':3,'Kauri Team':1},
  gardens:{solo:[],cooperation:[],competition:[]}
};
function createStarterVoxelGarden(mode='solo'){
  const cells=[];
  for(let y=0;y<VOXEL_ROWS;y++)for(let x=0;x<VOXEL_COLS;x++)cells.push({x,y,terrain:'grass',elevation:0,zone:null,crop:null,decoration:null,paidTerrainPrice:0,paidDecorationPrice:0,itemRotation:0,chairRotationManual:false});
  const cell=(x,y)=>cells[y*VOXEL_COLS+x];
  for(let y=0;y<VOXEL_ROWS;y++)cell(4,y).terrain='stone-path';
  for(let x=1;x<=3;x++)cell(x,5).terrain='wood-path';
  [[1,2],[2,2],[1,3],[2,3],[1,4],[2,4]].forEach(([x,y])=>cell(x,y).terrain='soil');
  [[3,2],[4,2],[3,3],[4,3]].forEach(([x,y])=>{Object.assign(cell(x,y),{terrain:'raised',zone:mode==='cooperation'?'shared-central':null});});
  [[7,4],[8,4],[7,5],[8,5]].forEach(([x,y])=>cell(x,y).terrain='water');
  cell(0,0).decoration='tree';cell(8,0).decoration='tree';cell(6,2).decoration='bench';cell(4,1).decoration='shared-marker';
  [[0,2],[0,4],[8,2],[8,6],[2,0],[6,0]].forEach(([x,y])=>cell(x,y).decoration='fence');
  cell(1,2).crop={kind:'kumara',stage:3,waterCount:2,paidPrice:0};
  cell(2,2).crop={kind:'carrot',stage:2,waterCount:1,paidPrice:0};
  cell(1,3).crop={kind:'tomato',stage:4,waterCount:3,paidPrice:0};
  cell(3,2).crop={kind:'nativeFlowers',stage:5,waterCount:4,paidPrice:0};
  if(mode==='competition'){cell(1,2).crop=null;cell(2,2).crop=null;cell(1,3).crop=null;cell(3,2).crop=null;}
  return {version:5,cols:VOXEL_COLS,rows:VOXEL_ROWS,cells,inventory:{kumara:0,carrot:0,tomato:0,sunflower:0,herbs:0,nativeFlowers:0},harvestCount:0};
}
function createVoxelGarden(mode='solo'){
  const world=createStarterVoxelGarden(mode);world.version=6;
  world.cells.forEach(cell=>Object.assign(cell,{terrain:'grass',elevation:0,zone:null,crop:null,decoration:null,paidTerrainPrice:0,paidDecorationPrice:0,itemPosition:null,terrainPosition:null,itemRotation:0,chairRotationManual:false}));
  return world;
}
function loadPrototypeData(){
  try{return {...structuredClone(defaultPrototypeData),...JSON.parse(localStorage.getItem(STORAGE_KEY)||'null')}}catch{return structuredClone(defaultPrototypeData)}
}
let prototypeData=loadPrototypeData();
function ensureVoxelWorlds(){
  let changed=false;
  prototypeData.voxelGardens??={};
  ['solo','cooperation','competition'].forEach(mode=>{
    const existing=prototypeData.voxelGardens[mode];
    if(existing?.version>=4){
      const template=createStarterVoxelGarden(mode),removeStarterDemo=existing.version<6;
      existing.inventory??={kumara:0,carrot:0,tomato:0,sunflower:0,herbs:0,nativeFlowers:0};existing.harvestCount??=0;
      existing.cells.forEach(cell=>{
        const starter=template.cells.find(entry=>entry.x===cell.x&&entry.y===cell.y),built=voxelBuildChoices.find(entry=>entry.id===cell.terrain),decor=voxelDecorations.find(entry=>entry.id===cell.decoration);
        cell.paidTerrainPrice??=starter?.terrain===cell.terrain?0:(built?.price||0);
        cell.paidDecorationPrice??=starter?.decoration===cell.decoration?0:(decor?.price||0);
        if(!Number.isFinite(cell.itemRotation)){cell.itemRotation=0;changed=true}
        if(typeof cell.chairRotationManual!=='boolean'){cell.chairRotationManual=false;changed=true}
        if(cell.crop)cell.crop.paidPrice??=starter?.crop?.kind===cell.crop.kind?0:(voxelPlants[cell.crop.kind]?.price||0);
        if(removeStarterDemo&&cell.crop&&starter?.crop?.kind===cell.crop.kind&&!cell.itemPosition&&(cell.crop.paidPrice||0)===0){cell.crop=null;cell.itemPosition=null;changed=true}
        if(removeStarterDemo&&cell.decoration&&starter?.decoration===cell.decoration&&!cell.itemPosition&&(cell.paidDecorationPrice||0)===0){cell.decoration=null;cell.itemPosition=null;cell.paidDecorationPrice=0;changed=true}
        if(removeStarterDemo&&starter?.terrain!=='grass'&&cell.terrain===starter.terrain&&!cell.terrainPosition&&(cell.paidTerrainPrice||0)===0&&!cell.crop&&!cell.decoration){cell.terrain='grass';cell.zone=null;cell.terrainPosition=null;cell.paidTerrainPrice=0;changed=true}
        if(mode!=='cooperation'&&cell.zone==='shared-central')cell.zone=null;
      });
      if(existing.version!==6){existing.version=6;changed=true}return;
    }
    const world=createVoxelGarden(mode),legacy=prototypeData.gardens?.[mode]||[];
    const legacyPlants={fern:'herbs',vegetables:'kumara',roses:'tomato',daisies:'nativeFlowers',lavender:'herbs','native-flower':'nativeFlowers',grass:'herbs'};
    const legacyDecorations={pohutukawa:'tree',kowhai:'tree',bench:'bench',tui:'bird-bath',kereru:'bird-bath',piwakawaka:'bird-bath',butterfly:'flower-patch'};
    const legacyTerrain={path:'stone-path','garden-stone':'stone-path',water:'water'};
    const nearest=(placed,predicate)=>{
      const targetX=Math.round(Math.max(0,Math.min(100,placed.x??50))/100*(VOXEL_COLS-1)),targetY=Math.round(Math.max(0,Math.min(100,placed.y??50))/100*(VOXEL_ROWS-1));
      return world.cells.filter(predicate).sort((a,b)=>(Math.abs(a.x-targetX)+Math.abs(a.y-targetY))-(Math.abs(b.x-targetX)+Math.abs(b.y-targetY)))[0];
    };
    legacy.forEach((placed,index)=>{
      const plant=legacyPlants[placed.itemId],decoration=legacyDecorations[placed.itemId],terrain=legacyTerrain[placed.itemId];
      const exactPosition={x:Math.max(0,Math.min(100,placed.x??50))/100,y:Math.max(0,Math.min(100,placed.y??50))/100};
      if(plant){const target=nearest(placed,entry=>entry.terrain==='grass'&&!entry.crop&&!entry.decoration);if(target){target.terrain='soil';target.crop={kind:plant,stage:Math.min(5,3+index%3),waterCount:2,paidPrice:0};target.itemPosition={...exactPosition};target.terrainPosition={...exactPosition}}}
      else if(decoration){const target=nearest(placed,entry=>entry.terrain==='grass'&&!entry.crop&&!entry.decoration);if(target){target.decoration=decoration;target.itemPosition={...exactPosition};target.itemRotation=0;target.chairRotationManual=false}}
      else if(terrain){const target=nearest(placed,entry=>entry.terrain==='grass'&&!entry.crop&&!entry.decoration);if(target){target.terrain=terrain;target.terrainPosition={...exactPosition}}}
    });
    prototypeData.voxelGardens[mode]=world;changed=true;
  });
  return changed;
}
if(ensureVoxelWorlds())savePrototypeData();
function voxelWorldFor(mode=state.builderMode){return prototypeData.voxelGardens[mode]}
function voxelPlantCount(mode='solo'){return voxelWorldFor(mode).cells.filter(entry=>entry.crop).length}
let competitionBudget=prototypeData.competitionBudget??50;
app.style.setProperty('--beat-duration',`${60/detectedBpm}s`);

function fa(value){return new Intl.NumberFormat('en-NZ',{useGrouping:false}).format(value)}
function clock(ms){const s=Math.floor(ms/1000);return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`}
function practiceClock(ms){return `${clock(ms)} / ${clock(PRACTICE_DURATION_MS)}`}
function totalMs(){return PRACTICE_DURATION_MS}
function mediaDurationMs(media=audio){return media&&Number.isFinite(media.duration)&&media.duration>0?media.duration*1000:0}
function mediaCycleMs(){const duration=mediaDurationMs();return duration&&duration<PRACTICE_DURATION_MS-MEDIA_END_TOLERANCE_MS?duration:PRACTICE_DURATION_MS}
function mediaTimeForPractice(ms,media=audio){
  const duration=mediaDurationMs(media);if(!duration)return 0;
  const mapped=duration<PRACTICE_DURATION_MS-MEDIA_END_TOLERANCE_MS?ms%duration:Math.min(ms,duration-MEDIA_END_TOLERANCE_MS);
  return Math.max(0,mapped/1000);
}
function bindPracticeMedia(media){
  if(!media||boundPracticeMedia.has(media))return;
  boundPracticeMedia.add(media);
  media.addEventListener('waiting',handlePracticeMediaWait);
  media.addEventListener('stalled',handlePracticeMediaWait);
  media.addEventListener('ended',handlePracticeMediaEnded);
}
function configurePracticeMedia(media=audio){
  if(!media)return;
  bindPracticeMedia(media);media.playbackRate=1;
  const duration=mediaDurationMs(media);media.loop=Boolean(duration&&duration<PRACTICE_DURATION_MS-MEDIA_END_TOLERANCE_MS);
}
function handlePracticeMediaWait(event){
  if(event.currentTarget!==audio||!playing)return;
  pausePlayback();syncStatus.textContent='The song paused while it loads. Continue when it is ready.';showToast('Song paused safely · Kua tatari te waiata');
}
function handlePracticeMediaEnded(event){
  if(event.currentTarget!==audio||!playing)return;
  const position=elapsed();
  if(totalMs()-position>MEDIA_END_TOLERANCE_MS){
    event.currentTarget.loop=true;event.currentTarget.currentTime=mediaTimeForPractice(position,event.currentTarget);
    event.currentTarget.play().catch(()=>handlePracticeMediaWait(event));
  }
}
function savedLyrics(track=state.track){
  try{return JSON.parse(localStorage.getItem(`approvedLyrics:${track}`)||'[]').filter(Boolean)}catch{return []}
}
function lyricForCue(cueIndex){
  const custom=savedLyrics(),profile=tracks[state.track];
  if(custom.length)return custom[Math.max(0,cueIndex)%custom.length];
  if((state.track==='toia'||state.track==='tutira')&&cueIndex>=0)return cues[cueIndex]?.m||profile.name;
  if(state.track==='whakarongo'&&cueIndex>=0)return cues[cueIndex]?.m||profile.name;
  return cueIndex<0?profile.name:'Approved lyrics can be added before the class.';
}
function cueStarts(){
  const cycle=mediaCycleMs();
  const start=Math.max(0,Math.min(syncOffset,cycle*.18));
  const usable=Math.max(1000,cycle-start-1200);
  const totalWeight=cues.reduce((sum,cue)=>sum+cue.w,0);
  let used=0;
  const beatMs=60000/detectedBpm;
  return cues.map(cue=>{const raw=start+used/totalWeight*usable;used+=cue.w;return start+Math.round((raw-start)/beatMs)*beatMs});
}
function cueAt(ms){
  const cycle=mediaCycleMs(),position=cycle<PRACTICE_DURATION_MS?ms%cycle:ms;
  const starts=cueStarts();if(position<starts[0])return -1;
  let current=0;for(let n=1;n<starts.length;n++){if(position<starts[n])break;current=n}return current;
}
function showToast(message){toast.textContent=message;toast.hidden=false;clearTimeout(showToast.t);showToast.t=setTimeout(()=>toast.hidden=true,2600)}

function showScreen(name, push=true){
  if(!screens.some(s=>s.dataset.screen===name)) return;
  if(state.screen==='session'&&name!=='session') pausePlayback();
  screens.forEach(s=>s.classList.toggle('active',s.dataset.screen===name));
  state.screen=name;
  if(push&&historyStack.at(-1)!==name) historyStack.push(name);
  backButton.hidden=name==='home'||name==='notice';
  helpButton.hidden=name==='notice';
  window.scrollTo(0,0);
  if(name==='session') renderStep(index);
  if(name==='album') renderAlbum();
  if(name==='home') renderHomeStats();
}

document.addEventListener('click',e=>{
  const go=e.target.closest('[data-go]');
  if(go){e.preventDefault();showScreen(go.dataset.go)}
});
document.addEventListener('click',e=>{
  const modeButton=e.target.closest('[data-start-mode]');
  if(modeButton){e.preventDefault();startMode(modeButton.dataset.startMode);return}
  const builderButton=e.target.closest('[data-open-builder]');
  if(builderButton){e.preventDefault();openBuilder(builderButton.dataset.openBuilder);}
});
backButton.addEventListener('click',()=>{historyStack.pop();showScreen(historyStack.pop()||'home')});
helpButton.addEventListener('click',()=>showToast('Move comfortably. Rest or stop if you feel pain or dizziness.'));

document.querySelectorAll('[data-choice-group]').forEach(group=>group.addEventListener('click',e=>{
  const choice=e.target.closest('.choice'); if(!choice)return;
  group.querySelectorAll('.choice').forEach(x=>x.classList.toggle('selected',x===choice));
  state[group.dataset.choiceGroup]=choice.dataset.value;
  if(group.dataset.choiceGroup==='movement') applyMovementMode();
}));

function savePrototypeData(){localStorage.setItem(STORAGE_KEY,JSON.stringify(prototypeData))}
function renderHomeStats(){}
function modeReward(){return sessionRewards[state.gameMode]||25}
function applyModeCopy(){
  const overviewTitle=document.querySelector('[data-screen="overview"] h1');
  const learnTitle=document.querySelector('[data-screen="learn"] h1');
  const overviewItems=[...document.querySelectorAll('[data-screen="overview"] .session-list li')];
  if(state.gameMode==='solo'){
    overviewTitle.textContent='Move gently, at your own pace';learnTitle.textContent='Follow your chosen waiata';
    overviewItems[2].querySelector('b').textContent='Earn · Collect';overviewItems[2].querySelector('small').textContent='Receive personal Garden Tokens';overviewItems[3].querySelector('small').textContent='Choose an item for your personal garden';
  }else if(state.gameMode==='competition'){
    overviewTitle.textContent='Move first, then build your challenge garden';learnTitle.textContent='Earn your 50-token garden budget';
    overviewItems[2].querySelector('b').textContent='Earn · Collect';overviewItems[2].querySelector('small').textContent='Unlock your 50-token garden budget';overviewItems[3].querySelector('b').textContent='Build';overviewItems[3].querySelector('small').textContent='Create and submit your challenge garden';
  }else{
    overviewTitle.textContent='Move gently, together';learnTitle.textContent='Follow the coach together';
    overviewItems[2].querySelector('b').textContent='Connect · Hono';overviewItems[2].querySelector('small').textContent='Acknowledge your effort and others';overviewItems[3].querySelector('b').textContent='Grow · Whakatipu';overviewItems[3].querySelector('small').textContent='Choose together for the shared garden';
  }
}
function startMode(mode){
  state.gameMode=mode;state.people=mode==='cooperation'?'whanau':'solo';sessionTokensEarned=0;sessionRewardGranted=false;sessionRecorded=false;shownGrowth.clear();carried=0;index=-1;
  sessionTokens.textContent='0';app.dataset.gameMode=mode;applyModeCopy();renderStep(-1);setCoachPhase('ready');
  if(mode==='competition')showScreen('challenge');else showScreen('movement');
}
document.querySelector('#movementContinue').addEventListener('click',()=>showScreen('comfort'));
document.querySelector('#comfortContinue').addEventListener('click',()=>{
  const profile=tracks[state.track];
  if(profile.requiresAudio&&!audio){showToast(`Add the ${profile.name} audio file first.`);audioFile.closest('.audio-picker').classList.add('required');setTimeout(()=>audioFile.closest('.audio-picker').classList.remove('required'),1800);return}
  showScreen('overview');
});
document.querySelector('#challengeType').addEventListener('click',event=>{
  const button=event.target.closest('[data-challenge-type]');if(!button)return;
  state.challengeType=button.dataset.challengeType;
  document.querySelectorAll('[data-challenge-type]').forEach(item=>item.classList.toggle('active',item===button));
});
document.querySelector('#startChallenge').addEventListener('click',()=>{
  state.gameMode='competition';prototypeData.voxelGardens.competition=createVoxelGarden('competition');competitionBudget=50;prototypeData.competitionBudget=50;savePrototypeData();applyModeCopy();showScreen('movement');
});

function applyMovementMode(){
  const standing=state.movement==='standing';
  const profile=tracks[state.track];
  app.classList.toggle('standing',standing);
  app.classList.toggle('seated-mode',!standing);
  performerWrap?.setAttribute('aria-label',`${profile.name} online tutor demonstrating the ${standing?'standing':'seated'} routine`);
  if(instructorLabel)instructorLabel.textContent=`${profile.name} · ${standing?'Standing':'Seated'} tutor`;
  modeLabel.textContent=standing?'Standing · Tū':state.movement==='adaptive'?'Choose freely · Kōwhiri':'Seated · Noho';
  if(coachModeCue){coachModeCue.querySelector('b').textContent=standing?'Standing':'Seated';coachModeCue.querySelector('small').textContent=standing?'Full body · gentle steps':'Upper body · no steps'}
  sessionMode?.querySelectorAll('button').forEach(button=>{
    const active=button.dataset.sessionMode===(standing?'standing':'seated');
    button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));
  });
  updateMovementInstruction();
}
sessionMode?.addEventListener('click',event=>{
  const button=event.target.closest('[data-session-mode]');if(!button)return;
  state.movement=button.dataset.sessionMode;applyMovementMode();
  showToast(state.movement==='standing'?'Standing mode · Tū':'Seated mode · Noho');
});
function applyMirrorMode(){
  app.classList.toggle('mirror-mode',state.mirror);
  mirrorMode.classList.toggle('same-side',!state.mirror);
  mirrorMode.textContent=state.mirror?'🪞 Mirror mode · Coach left = your right':'↔ Same side · Coach left = your left';
  mirrorMode.setAttribute('aria-pressed',String(state.mirror));
}
mirrorMode?.addEventListener('click',()=>{state.mirror=!state.mirror;applyMirrorMode();showToast(state.mirror?'Mirror mode is on · Copy opposite hands':'Same-side mode is on · Copy the same hand')});
document.querySelector('#captionsToggle').addEventListener('change',e=>app.classList.toggle('no-captions',!e.target.checked));
document.querySelector('#contrastToggle').addEventListener('change',e=>app.classList.toggle('high-contrast',e.target.checked));
function clearCurrentMedia(){
  app.classList.remove('tutorial-mode','dance-mode');
  if(audio){
    audio.pause();
    if(audio!==coachVideo&&audio.src.startsWith('blob:'))URL.revokeObjectURL(audio.src);
  }
  coachVideo.pause();coachVideo.loop=false;coachVideo.muted=true;
  audio=null;
}
function loadBundledCoachVideo(){
  if(bundledCoachPromise)return bundledCoachPromise;
  bundledCoachPromise=(async()=>{
    if(location.protocol==='file:'){
      defaultCoachSrc='assets/video/toia-ai-coach-2min.mp4';
      if(!customCoachVideoUrl){coachVideo.src=defaultCoachSrc;coachVideo.load()}
      return defaultCoachSrc;
    }
    const responses=[];
    for(const part of bundledCoachParts){const response=await fetch(part);if(!response.ok)throw new Error(`Coach media failed to load: ${response.status}`);responses.push(await response.arrayBuffer())}
    defaultCoachObjectUrl=URL.createObjectURL(new Blob(responses,{type:'video/mp4'}));defaultCoachSrc=defaultCoachObjectUrl;
    if(!customCoachVideoUrl){coachVideo.src=defaultCoachSrc;coachVideo.load()}
    return defaultCoachSrc;
  })();
  return bundledCoachPromise;
}
function restoreDefaultCoach(){
  if(!customCoachVideoUrl)return;
  URL.revokeObjectURL(customCoachVideoUrl);customCoachVideoUrl=null;
  if(defaultCoachSrc){coachVideo.src=defaultCoachSrc;coachVideo.load()}else loadBundledCoachVideo().catch(()=>showToast('The coach video could not load.'));
}
function setCoachPhase(phase){
  app.classList.remove('tutorial-mode');
  app.classList.toggle('dance-mode',phase==='dance');
  coachPhase.textContent=phase==='dance'?'2:00 · Move with the song':'Ready · One 2-minute practice';
}
function coachBaseRate(){
  const profile=tracks[state.track];
  // Keep human motion close to its recorded cadence; very slow AI playback looks elastic.
  return profile.soundtrack?1:Math.max(.85,Math.min(1,detectedBpm/80));
}
function coachTargetTime(ms=carried){
  const duration=Number.isFinite(coachVideo.duration)?coachVideo.duration:120;
  return ((tracks[state.track].coachStart||0)+(ms/1000)*coachBaseRate())%duration;
}
function syncCoach(ms=carried,force=false){
  const profile=tracks[state.track];if(!profile.coach||audio===coachVideo)return;
  coachVideo.muted=true;coachVideo.loop=true;coachVideo.playbackRate=coachBaseRate();
  const target=coachTargetTime(ms);
  const drift=Math.abs(coachVideo.currentTime-target);
  if(force||drift>.45)coachVideo.currentTime=target;
}
coachVideo.addEventListener('loadedmetadata',()=>{
  if(audio===coachVideo){configurePracticeMedia(coachVideo);carried=0;time.textContent=practiceClock(0);renderStep(-1)}
});
function launchSelectedTutor(track=state.track){
  if(track!==state.track||!audio)return;
  pendingAutoStartTrack=null;carried=0;index=-1;renderStep(-1);showScreen('session');
  // Keep playback inside the trusted song-button gesture so the browser
  // permits the tutor's unmuted two-minute video to start immediately.
  void startMusicPlayback();
}
document.querySelector('#trackLibrary').addEventListener('click',e=>{
  const button=e.target.closest('.track');if(!button)return;
  const userRequestedStart=app.dataset.ready==='true';pendingAutoStartTrack=null;
  document.querySelectorAll('.track').forEach(item=>item.classList.toggle('selected',item===button));
  clearCurrentMedia();restoreDefaultCoach();state.track=button.dataset.track;const profile=tracks[state.track];cues=[...profile.cues];detectedBpm=profile.bpm;syncOffset=profile.soundtrack?0:4200;app.style.setProperty('--beat-duration',`${60/detectedBpm}s`);
  app.dataset.track=state.track;bpmLabel.textContent=`${profile.name.toUpperCase()} · ${detectedBpm} BPM`;audioFile.value='';carried=0;index=-1;shownGrowth.clear();setCoachPhase('ready');
  lyricsInput.value=savedLyrics().join('\n');
  app.classList.toggle('video-coach',Boolean(profile.coach));app.classList.toggle('kling-coach',Boolean(profile.coach));customRoutine=profile.tutor?'song-specific':'';applyMovementMode();
  coachVideo.currentTime=profile.coachStart||0;coachVideo.muted=!profile.soundtrack;coachVideo.loop=!profile.soundtrack;
  if(profile.soundtrack){
    audio=coachVideo;configurePracticeMedia(audio);
    trackHint.textContent='▶ One two-minute song practice with the movement coach';audioName.textContent='Video and music are ready · Press Start in the session';
    syncStatus.textContent='The song, coach and practice clock run together for exactly 2:00.';
  }else if(profile.audioSrc){
    audio=new Audio(profile.audioSrc);audio.preload='metadata';bindPracticeMedia(audio);audio.addEventListener('loadedmetadata',()=>configurePracticeMedia(audio),{once:true});
    syncCoach(0,true);trackHint.textContent='♪ Full two-minute dance class with song and video coach';audioName.textContent='Song, coach and two-minute routine are ready';
    syncStatus.textContent='The coach follows this song for the full two-minute class.';
  }else{
    syncCoach(0,true);
    trackHint.textContent=`Required: choose your licensed ${profile.name} audio file`;
    audioName.textContent='Add this waiata to hear singing with its online tutor.';
    syncStatus.textContent='Add the real song to run its seated or standing tutor for exactly 2:00.';
  }
  renderStep(-1);
  if(profile.tutor){maori.textContent=profile.name.toUpperCase();title.textContent='Follow the online tutor and sing';instruction.textContent=routineReadyInstructions[state.track][state.movement==='standing'?'standing':'seated'];comfortCue.textContent=state.movement==='standing'?'Use small supported steps. Pause whenever you need.':'Keep both feet supported. Pause whenever you need.';stepCount.textContent='2-MINUTE ONLINE CLASS'}
  if(app.dataset.ready==='true')showToast(`${profile.name} selected · Kua kōwhiria`);
  if(userRequestedStart){
    if(audio)launchSelectedTutor(state.track);
    else if(uploadedSongFiles.has(state.track)){pendingAutoStartTrack=state.track;loadSelectedSongFile(uploadedSongFiles.get(state.track))}
    else{pendingAutoStartTrack=state.track;trackHint.textContent=`Choose the ${profile.name} song to start its tutor`;showToast(`Add ${profile.name}, then the tutor starts automatically`);audioFile.click()}
  }
});

function showPose(name){
  const seatedPose={transition:'receive','step-left':'listen'}[name]||name;
  poseLayers.forEach(layer=>layer.classList.toggle('active',layer.classList.contains(`pose-${seatedPose}`)));
}

function updateMovementInstruction(){
  const standing=state.movement==='standing';
  const mode=standing?'standing':'seated',routine=routineInstructions[state.track];
  if(index<0){instruction.textContent=routineReadyInstructions[state.track][mode];comfortCue.textContent=standing?'Use small steps and hold a chair if needed.':'Keep both feet supported. No stepping is needed.';return}
  const cue=cues[index];if(!cue)return;
  instruction.textContent=(routine.byStep?routine[mode][cue.step]:routine[mode][index])||shortInstructions[cue.step];
  comfortCue.textContent=(standing?'Keep every step small. Hold a chair if needed.':'Stay seated. Copy only the arms, shoulders and gentle toe taps.')+(state.rate<1?' Use the smallest comfortable range.':'');
}

function updateBilingualLyric(cue){
  if(!lyricMaori||!lyricEnglish)return;
  if(!cue){lyricMaori.textContent=state.track==='toia'?'Whakaritea':state.track==='tutira'?'Tūtira mai ngā iwi':tracks[state.track].name;lyricEnglish.textContent=state.track==='tutira'?'Stand together, people':'Get ready';return}
  lyricMaori.textContent=lyricForCue(index);
  lyricEnglish.textContent=cue.en||cue.t||steps[cue.step]?.t||'Follow the movement';
}

function renderStep(n){
  index=Math.max(-1,Math.min(cues.length-1,n));
  if(index<0){const intro=steps[0];maori.textContent='Whakaritea';title.textContent='Get ready · Whakaritea';lyricLine.textContent=lyricForCue(-1);updateBilingualLyric(null);updateMovementInstruction();stepCount.textContent='INTRO · TĪMATANGA';motionSymbol.textContent='✋';sessionTokensEarned=0;sessionTokens.textContent='0';showPose('receive');armLeft.style.transform=`rotate(${intro.l}deg)`;armRight.style.transform=`rotate(${intro.r}deg)`;return}
  const cue=cues[index],s=steps[cue.step];
  maori.textContent=cue.m; title.textContent=cue.t||s.t;lyricLine.textContent=lyricForCue(index);updateBilingualLyric(cue);updateMovementInstruction();motionSymbol.textContent=movementSymbols[cue.step];
  showPose(poseForStep[cue.step]);
  stepCount.textContent=`${fa(index+1)} OF ${fa(cues.length)}`;
  armLeft.style.transform=`rotate(${s.l}deg)`; armRight.style.transform=`rotate(${s.r}deg)`;
  app.classList.toggle('heart',Boolean(s.heart)); app.classList.toggle('wiri',Boolean(s.wiri));
  const percent=Math.round((index+1)/cues.length*100);
  gardenBar.style.width=`${percent}%`; gardenPercent.textContent=`${fa(percent)}%`;
  sessionTokensEarned=Math.min(modeReward(),Math.round(modeReward()*(index+1)/cues.length));sessionTokens.textContent=fa(sessionTokensEarned);
  if(playing&&growthMilestones.includes(index)&&!shownGrowth.has(index))showGrowthCelebration(index);
}
function showGrowthCelebration(milestone){
  shownGrowth.add(milestone);
  growthMessage.textContent=milestone>=11?'A new flower opened! · Kua puāwai!':'Your garden grew! · Kua tipu tō māra!';
  growthCelebration.hidden=false;
  clearTimeout(showGrowthCelebration.timer);
  showGrowthCelebration.timer=setTimeout(()=>{growthCelebration.hidden=true},2350);
}
function setPlaying(value){
  playing=value; app.classList.toggle('playing',value);
  playButton.querySelector('span').textContent=value?'Ⅱ':'▶';
  playButton.querySelector('b').textContent=value?'Pause · Tatari':'Continue · Haere';
}
function elapsed(){return playing?Math.min(totalMs(),carried+(performance.now()-startedAt)):carried}
function syncPracticeMedia(ms=carried,force=false){
  if(!audio||!mediaDurationMs(audio))return;
  const target=mediaTimeForPractice(ms,audio),duration=audio.duration;
  let drift=audio.currentTime-target;
  if(mediaDurationMs(audio)<PRACTICE_DURATION_MS-MEDIA_END_TOLERANCE_MS){
    if(drift>duration/2)drift-=duration;
    if(drift<-duration/2)drift+=duration;
  }
  audio.playbackRate=1;
  if(force||Math.abs(drift)>.35)audio.currentTime=target;
}
function tick(){
  const e=elapsed(),cue=cueAt(e);
  if(cue!==index)renderStep(cue);
  if(customRoutine&&index>=0){
    const halfBeat=Math.max(0,Math.floor((e-syncOffset)/(30000/detectedBpm)));
    const primaryPose=poseForStep[cues[index].step];
    const motionCycle=[primaryPose,'transition',primaryPose,'step-left'];
    showPose(motionCycle[halfBeat%motionCycle.length]);
  }
  if(audio&&performance.now()-lastMediaSync>500){syncPracticeMedia(e);lastMediaSync=performance.now()}
  if(tracks[state.track].coach&&audio!==coachVideo&&performance.now()-lastCoachSync>500){syncCoach(e);lastCoachSync=performance.now()}
  const pct=e/totalMs()*100; progress.style.width=`${pct}%`; gardenBar.style.width=`${pct}%`; gardenPercent.textContent=`${fa(Math.round(pct))}%`;time.textContent=practiceClock(e);
  if(e>=totalMs()){carried=totalMs();stopBeat();audio?.pause();if(audio!==coachVideo)coachVideo.pause();setPlaying(false);completeMovements();return}
  if(playing)raf=requestAnimationFrame(tick);
}
function beat(){
  if(!playing||audio)return; const now=audioContext.currentTime, interval=60/detectedBpm;
  while(nextBeat<now+.12){const o=audioContext.createOscillator(),g=audioContext.createGain();o.frequency.value=420;g.gain.setValueAtTime(.0001,nextBeat);g.gain.exponentialRampToValueAtTime(.08,nextBeat+.006);g.gain.exponentialRampToValueAtTime(.0001,nextBeat+.07);o.connect(g).connect(audioContext.destination);o.start(nextBeat);o.stop(nextBeat+.08);nextBeat+=interval}
  beatTimer=setTimeout(beat,50);
}
function startBeat(){if(audio)return;audioContext??=new AudioContext();audioContext.resume();nextBeat=audioContext.currentTime+.05;beat()}
function stopBeat(){clearTimeout(beatTimer)}
function pausePlayback(){
  if(!playing)return;
  carried=elapsed();setPlaying(false);cancelAnimationFrame(raf);stopBeat();audio?.pause();if(audio!==coachVideo)coachVideo.pause();
}
async function startMusicPlayback(){
  if(carried>=totalMs()){carried=0;renderStep(-1);if(audio)audio.currentTime=0}
  if(audio){
    configurePracticeMedia(audio);audio.currentTime=mediaTimeForPractice(carried,audio);audio.playbackRate=1;
    if(audio===coachVideo)coachVideo.muted=false;
    try{await audio.play()}catch{setPlaying(false);syncStatus.textContent='The song did not start. Press Start again when it is ready.';showToast('Tap Start again · Pāwhiria anō');return}
  }
  startedAt=performance.now();lastMediaSync=startedAt;setCoachPhase('dance');setPlaying(true);
  if(!audio)startBeat();
  if(tracks[state.track].coach&&audio!==coachVideo){syncCoach(carried,true);coachVideo.play().catch(()=>showToast('Tap again to start the coach · Pāwhiria anō'))}
  tick();
}
function playPlayback(){
  if(tracks[state.track].requiresAudio&&!audio){showToast(`Add the ${tracks[state.track].name} song first.`);return}
  startMusicPlayback();
}
playButton.addEventListener('click',()=>playing?pausePlayback():playPlayback());
function seekStep(n){
  const next=Math.max(0,Math.min(cues.length-1,n)),cycle=mediaCycleMs(),cycleBase=cycle<PRACTICE_DURATION_MS?Math.floor(carried/cycle)*cycle:0;
  carried=Math.min(totalMs(),cycleBase+cueStarts()[next]);renderStep(next);
  if(audio&&Number.isFinite(audio.duration))audio.currentTime=mediaTimeForPractice(carried,audio);
  syncCoach(carried,true);
  progress.style.width=`${carried/totalMs()*100}%`;time.textContent=practiceClock(carried);
}
document.querySelector('#previous').addEventListener('click',()=>seekStep(index-1));
document.querySelector('#next').addEventListener('click',()=>index===cues.length-1?completeMovements():seekStep(index+1));
document.querySelector('#replay').addEventListener('click',speakInstruction);
document.querySelector('#replayFromPause').addEventListener('click',speakInstruction);
document.querySelector('#pauseHelp').addEventListener('click',()=>{pausePlayback();showScreen('pause')});
document.querySelector('#changeMode').addEventListener('click',()=>{state.movement='seated';applyMovementMode();showToast('Seated mode is on · Kua noho')});
document.querySelector('#skipFromPause').addEventListener('click',()=>{seekStep(index+1);showScreen('session')});
document.querySelector('#slower').addEventListener('click',e=>{state.rate=state.rate===1?.85:1;app.classList.toggle('gentle-practice',state.rate<1);e.currentTarget.querySelector('b').textContent=state.rate<1?'✓ Gentle moves':'🐢 Gentler moves';updateMovementInstruction();showToast(state.rate<1?'Use a smaller comfortable range · Kia ngāwari':'Usual movement range · Neke noa')});
document.querySelector('#previewMove').addEventListener('click',()=>{renderStep(0);app.classList.add('heart');showToast('Hand to ear, then heart · Ringa ki te taringa, ki te ngākau')});
document.querySelector('#syncNow').addEventListener('click',()=>{
  if(!audio){showToast('Choose an audio file first · Kōwhiria he kōnae oro');return}
  syncOffset=audio.currentTime*1000;renderStep(cueAt(elapsed()));syncCoach(elapsed(),true);
  syncStatus.textContent=customRoutine?`Movements synced to the first beat at ${clock(syncOffset)}`:`Synced · Kua tukutahi: first vocal phrase at ${clock(syncOffset)}`;
  showToast('Movements are synced · Kua tukutahi ngā nekehanga');
});

function speakInstruction(){
  if(!('speechSynthesis'in window)){showToast('Voice guidance is unavailable · Kāore he reo āwhina');return}
  speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(`${title.textContent}. ${instruction.textContent}`);utterance.lang='en-NZ';utterance.rate=.82;speechSynthesis.speak(utterance);showToast('Playing guidance · E whakatangihia ana te āwhina');
}
function completeMovements(full=true){
  pausePlayback();
  if(full){renderStep(cues.length-1);progress.style.width='100%';gardenBar.style.width='100%';gardenPercent.textContent='100%';sessionTokensEarned=modeReward();sessionTokens.textContent=fa(sessionTokensEarned)}
  if(!sessionRewardGranted){
    if(state.gameMode==='solo'){prototypeData.profile.tokens+=sessionTokensEarned;prototypeData.profile.sessions+=1;prototypeData.profile.level=Math.min(4,1+Math.floor(prototypeData.profile.sessions/2))}
    if(state.gameMode==='cooperation')prototypeData.sharedTokens+=sessionTokensEarned;
    if(state.gameMode==='competition'){competitionBudget=sessionTokensEarned;prototypeData.competitionBudget=competitionBudget}
    sessionRewardGranted=true;savePrototypeData();
  }
  prepareMovementReward();showScreen('reward');
}
function prepareMovementReward(){
  rewardNext='builder';document.querySelector('.token-award').hidden=false;rewardTokens.textContent=fa(sessionTokensEarned);
  const copy={
    solo:['Wonderful work!','You earned a new plant for your garden. Would you like to plant it now?','Plant now'],
    competition:[sessionTokensEarned===50?'Challenge budget earned!':'Movement tokens earned!',`Use your ${fa(sessionTokensEarned)} Garden Tokens and the visible scoring rules to build.`,'Build Challenge Garden'],
    cooperation:[`Together, you earned ${fa(sessionTokensEarned)} Garden Tokens!`,'What should we grow together?','Open Shared Garden']
  }[state.gameMode];
  rewardTitle.textContent=copy[0];
  if(state.gameMode==='solo')rewardMessage.innerHTML='You earned a new plant for your garden.<br><strong>Would you like to plant it now?</strong>';
  else rewardMessage.textContent=copy[1];
  openRewardGarden.querySelector('span').textContent=copy[2];savePlantLater.hidden=false;savePlantLater.textContent='Save for later';
}
document.querySelector('#finishSessionEarly').addEventListener('click',()=>completeMovements(false));

async function analyzeAudioFile(file){
  try{
    audioContext??=new AudioContext();const decoded=await audioContext.decodeAudioData((await file.arrayBuffer()).slice(0));
    const data=decoded.getChannelData(0),hop=1024,count=Math.floor(data.length/hop),energy=new Float32Array(count);
    let mean=0;for(let i=0;i<count;i++){let sum=0;for(let j=0;j<hop;j+=4){const v=data[i*hop+j];sum+=v*v}energy[i]=Math.sqrt(sum/(hop/4));mean+=energy[i]}mean/=count;
    let variance=0;for(const value of energy)variance+=(value-mean)**2;const deviation=Math.sqrt(variance/count);
    let onset=0;for(let i=0;i<energy.length;i++){if(energy[i]>mean+deviation*1.25){onset=i;break}}
    const isDeleKoochooloo=/\u062f\u0644\s*\u06a9\u0648\u0686\u0648\u0644\u0648|dele?[-_\s]*koo?choo?loo|del[-_\s]*kooch/i.test(file.name);
    customRoutine=isDeleKoochooloo?'dele-koochooloo':'';
    if(isDeleKoochooloo){cues=deleKoochoolooCues.map(cue=>({...cue}));detectedBpm=112}
    else{cues=[...tracks[state.track].cues]}
    const bpmFloor=isDeleKoochooloo?96:55,bpmCeiling=isDeleKoochooloo?128:90;
    let bestBpm=isDeleKoochooloo?112:tracks[state.track].bpm,bestScore=-Infinity;
    for(let bpm=bpmFloor;bpm<=bpmCeiling;bpm+=.5){const lag=Math.round(60*decoded.sampleRate/(bpm*hop));let score=0;for(let i=lag;i<energy.length;i++)score+=(energy[i]-mean)*(energy[i-lag]-mean);if(score>bestScore){bestScore=score;bestBpm=bpm}}
    detectedBpm=Math.round(bestBpm);syncOffset=onset*hop/decoded.sampleRate*1000;bpmLabel.textContent=`${detectedBpm} BPM`;app.style.setProperty('--beat-duration',`${60/detectedBpm}s`);
    syncCoach(carried,true);
    if(isDeleKoochooloo){
      const blockMs=8*60000/detectedBpm;
      const blockCount=Math.max(12,Math.round((decoded.duration*1000-syncOffset-1200)/blockMs));
      const danceCycle=deleKoochoolooCues.slice(0,-1);
      cues=Array.from({length:blockCount},(_,n)=>({...danceCycle[n%danceCycle.length]}));
      cues[cues.length-1]={...deleKoochoolooCues.at(-1)};
      trackHint.textContent='♪ Dele Koochooloo dance routine is active';syncStatus.textContent='The opening beat was detected automatically. Tap Sync on the first clear beat to fine-tune it.';document.querySelector('#syncNow').textContent='Sync to first beat';renderStep(-1)
    }
    audioName.textContent=`${file.name} · ${detectedBpm} BPM detected`;
  }catch{detectedBpm=tracks[state.track].bpm;bpmLabel.textContent=`${detectedBpm} BPM`;audioName.textContent=`${file.name} · using ${detectedBpm} BPM profile`}
}

function finishPendingAutoStart(track){
  if(pendingAutoStartTrack===track&&state.track===track)launchSelectedTutor(track);
}
function loadSelectedSongFile(file){
  const loadingTrack=state.track;
  clearCurrentMedia();shownGrowth.clear();setCoachPhase('ready');app.classList.toggle('video-coach',Boolean(tracks[state.track].coach));app.classList.toggle('kling-coach',Boolean(tracks[state.track].coach));
  if(file.type.startsWith('video/')){
    app.classList.add('video-coach','kling-coach');restoreDefaultCoach();customCoachVideoUrl=URL.createObjectURL(file);coachVideo.src=customCoachVideoUrl;coachVideo.load();coachVideo.muted=false;coachVideo.loop=false;audio=coachVideo;syncOffset=0;
    audioName.textContent=`Full class video ready: ${file.name}`;trackHint.textContent='✓ This dance video and its song will run as one two-minute practice';syncStatus.textContent='The uploaded class video uses its own synchronized dance and sound for exactly 2:00.';
    audio.addEventListener('loadedmetadata',()=>{configurePracticeMedia(audio);carried=0;renderStep(-1);time.textContent=practiceClock(0);finishPendingAutoStart(loadingTrack)},{once:true});showToast('Full class video added');return;
  }
  coachVideo.muted=true;coachVideo.loop=true;syncCoach(0,true);audio=new Audio(URL.createObjectURL(file));audio.preload='metadata';
  bindPracticeMedia(audio);
  audioName.textContent='Analysing tempo · E tātari ana i te manawataki…';analyzeAudioFile(file);
  audio.addEventListener('loadedmetadata',()=>{configurePracticeMedia(audio);carried=0;renderStep(-1);time.textContent=practiceClock(0);syncStatus.textContent=mediaCycleMs()<PRACTICE_DURATION_MS?'This song repeats with its movement cues to complete exactly 2:00. Tap Sync at the first sung phrase.':'This practice stops at exactly 2:00. Tap Sync at the first sung phrase.';finishPendingAutoStart(loadingTrack)});
  audioName.textContent=`Selected · Kua kōwhiria: ${file.name}`;showToast('Audio added · Kua tāpirihia te oro');
}
audioFile.addEventListener('change',()=>{
  const file=audioFile.files[0];if(!file)return;
  uploadedSongFiles.set(state.track,file);loadSelectedSongFile(file);
});
lyricsInput.addEventListener('input',()=>{
  const lines=lyricsInput.value.split(/\r?\n/).map(line=>line.trim()).filter(Boolean);
  localStorage.setItem(`approvedLyrics:${state.track}`,JSON.stringify(lines));renderStep(index);
});

document.querySelector('#connectDone').addEventListener('click',()=>{
  if(!sessionRecorded){const count=Number(localStorage.getItem('whakarongoSessionsV2')||0)+1;localStorage.setItem('whakarongoSessionsV2',String(count));sessionRecorded=true}
  showScreen('complete');
});
function renderAlbum(){
  const count=prototypeData.profile.sessions;
  const plants=voxelPlantCount('solo');
  document.querySelector('#sessionCount').textContent=fa(count);document.querySelector('#plantCount').textContent=fa(plants);
  document.querySelector('#gardenCount').textContent=plants?'▦ '.repeat(Math.min(plants,7)):'▱';
}

function walletFor(mode=state.builderMode){return mode==='solo'?prototypeData.profile.tokens:mode==='cooperation'?prototypeData.sharedTokens:competitionBudget}
function setWallet(value,mode=state.builderMode){
  if(mode==='solo')prototypeData.profile.tokens=value;
  else if(mode==='cooperation')prototypeData.sharedTokens=value;
  else{competitionBudget=value;prototypeData.competitionBudget=value}
}
const voxelContext=voxelGardenCanvas.getContext('2d');
const reducedVoxelMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
let voxelMetrics={width:0,height:0,dpr:1,tileW:72,tileH:36,blockH:17,originX:0,originY:0};
const terrainNames={grass:'Grass lawn · Pātītī',soil:'Soil plot · Papa whakatō',raised:'Raised garden bed · Pouaka māra','wood-path':'Wooden path · Ara rākau','stone-path':'Stone path · Ara kōhatu',water:'Water garden · Wai māra'};

function openBuilder(mode=state.gameMode){
  state.builderMode=mode;
  const copy={
    solo:['MY GARDEN · TŌKU MĀRA','My Peaceful Home Garden','A calm New Zealand backyard that grows with you.'],
    competition:['GARDEN CHALLENGE',state.challengeType==='team'?'Our Team Garden':'My Garden Challenge','Choose, preview and place each garden feature.'],
    cooperation:['OUR SHARED GARDEN · TŌ TĀTOU MĀRA','Māra Tahi · Shared Home Garden','Create this peaceful garden together.']
  }[mode];
  builderEyebrow.textContent=copy[0];builderTitle.textContent=copy[1];builderSubtitle.textContent=copy[2];
  turnCard.hidden=mode!=='cooperation';selectedVoxelCell={x:4,y:3};voxelChoiceMode=null;voxelUndoStack.length=0;
  Object.assign(gardenEditor,{mode:'idle',choice:null,source:null,category:'plants',collection:false,previewPosition:null,target:null,previewValid:false,dragPointerId:null,dragOffset:null});Object.assign(gardenCamera,{zoom:1,panX:0});
  gardenDrawer.hidden=true;gardenCollectionPanel.hidden=true;
  voxelActionBar.hidden=true;moreGardenChoices.setAttribute('aria-expanded','false');moreGardenChoices.textContent='＋ More garden choices · Ētahi atu kōwhiringa';
  showScreen('builder');renderGardenBuilder();ensureVoxelAnimation();
  if(openGardenAfterReward){openGardenAfterReward=false;requestAnimationFrame(()=>openGardenDrawer(false))}
}

function competitionScore(includeSubmit=false){
  const cells=voxelWorldFor('competition').cells;
  const theme=Math.min(30,cells.filter(cell=>cell.crop?.kind==='nativeFlowers'||cell.decoration==='shared-marker').length*10);
  const varieties=new Set();
  cells.forEach(cell=>{if(cell.crop)varieties.add(`crop:${cell.crop.kind}`);if(cell.decoration)varieties.add(`decor:${cell.decoration}`);if(cell.terrain!=='grass')varieties.add(`terrain:${cell.terrain}`)});
  const variety=Math.min(20,varieties.size*2);
  const movement=Math.min(40,Math.round(sessionTokensEarned/sessionRewards.competition*40));
  return {movement,theme,variety,submit:includeSubmit?10:0,total:movement+theme+variety+(includeSubmit?10:0)};
}
function renderBuilderProgress(){
  if(state.builderMode==='competition'){
    const score=competitionScore(false);
    builderProgress.innerHTML=`<b>Live score: ${score.total}/90</b><span>Movement ${score.movement}/40 · Theme ${score.theme}/30 · Variety ${score.variety}/20</span>`;
  }else if(state.builderMode==='solo'){
    builderProgress.innerHTML=`<b>${prototypeData.profile.name} · Level ${prototypeData.profile.level}</b><span>${prototypeData.profile.sessions} gentle movement sessions completed</span>`;
  }else{
    builderProgress.innerHTML='<b>We grew this together.</b><span>Every movement helped our garden grow.</span>';
  }
}

function playGardenEffect(effect='success'){
  if(!gardenSoundEnabled)return;
  try{
    const AudioContextClass=window.AudioContext||window.webkitAudioContext;audioContext??=new AudioContextClass();audioContext.resume();
    const now=audioContext.currentTime;
    const notes={tap:[[330,0,.07,.012,'sine',390]],success:[[523,0,.2,.03,'sine',560],[659,.07,.22,.032,'sine',700]],plant:[[196,0,.16,.025,'triangle',262],[330,.1,.2,.025,'sine',392]],water:[[640,0,.12,.018,'sine',860],[820,.08,.13,.018,'sine',1080],[980,.16,.14,.016,'sine',1240]],harvest:[[523,0,.2,.032,'sine',560],[659,.07,.24,.035,'sine',700],[784,.15,.3,.038,'sine',830]],build:[[138,0,.09,.025,'square',115],[196,.07,.14,.02,'triangle',174]],decorate:[[587,0,.16,.025,'sine',660],[880,.08,.28,.03,'sine',990]],remove:[[320,0,.16,.02,'triangle',180]]}[effect]||[[523,0,.2,.03,'sine',560],[659,.07,.22,.032,'sine',700]];
    notes.forEach(([frequency,delay,duration,volume,wave,endFrequency])=>{const oscillator=audioContext.createOscillator(),gain=audioContext.createGain(),start=now+delay;oscillator.type=wave;oscillator.frequency.setValueAtTime(frequency,start);oscillator.frequency.exponentialRampToValueAtTime(endFrequency,start+duration);gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(volume,start+.018);gain.gain.exponentialRampToValueAtTime(.0001,start+duration);oscillator.connect(gain).connect(audioContext.destination);oscillator.start(start);oscillator.stop(start+duration+.02)});
    if(['plant','water'].includes(effect)){
      const duration=effect==='water'?.3:.18,buffer=audioContext.createBuffer(1,Math.ceil(audioContext.sampleRate*duration),audioContext.sampleRate),data=buffer.getChannelData(0);
      for(let index=0;index<data.length;index++)data[index]=(Math.random()*2-1)*(1-index/data.length);
      const source=audioContext.createBufferSource(),filter=audioContext.createBiquadFilter(),gain=audioContext.createGain();source.buffer=buffer;filter.type=effect==='water'?'bandpass':'lowpass';filter.frequency.value=effect==='water'?1700:480;filter.Q.value=effect==='water'?.8:.5;gain.gain.setValueAtTime(effect==='water'?.026:.018,now);gain.gain.exponentialRampToValueAtTime(.0001,now+duration);source.connect(filter).connect(gain).connect(audioContext.destination);source.start(now);source.stop(now+duration);
    }
  }catch{/* Garden sounds are optional and never block play. */}
}

function selectedVoxel(){return voxelWorldFor().cells.find(cell=>cell.x===selectedVoxelCell.x&&cell.y===selectedVoxelCell.y)}
function voxelActionAvailability(cell=selectedVoxel()){
  if(!cell)return {plant:false,water:false,harvest:false,build:false,decorate:false,change:false,remove:false};
  const plantingTerrain=['soil','raised'].includes(cell.terrain);
  return {
    plant:plantingTerrain&&!cell.crop&&!cell.decoration,
    water:Boolean(cell.crop&&cell.crop.stage<5),
    harvest:Boolean(cell.crop&&cell.crop.stage===5),
    build:!cell.crop&&!cell.decoration,
    decorate:!cell.crop&&!cell.decoration&&cell.terrain!=='water',
    change:Boolean(cell.crop),
    remove:Boolean(cell.crop||cell.decoration||cell.terrain!=='grass')
  };
}
function describeVoxelCell(cell=selectedVoxel()){
  if(!cell)return ['No block selected','Choose a block in the garden.'];
  const place=terrainNames[cell.terrain]||cell.terrain;
  if(cell.crop){const plant=voxelPlants[cell.crop.kind];return [`${plant.name} · ${plant.maori}`,`${place} · ${GROWTH_STAGES[cell.crop.stage]}`]}
  if(cell.decoration){const item=voxelDecorations.find(entry=>entry.id===cell.decoration);return [item?`${item.name} · ${item.maori}`:'Garden decoration',place]}
  return [place,cell.zone==='shared-central'?'Central shared garden · Māra tahi':GROWTH_STAGES[0]];
}
function snapshotVoxelUndo(){
  voxelUndoStack.push({mode:state.builderMode,world:structuredClone(voxelWorldFor()),wallet:walletFor(),turn:prototypeData.turn});
  if(voxelUndoStack.length>30)voxelUndoStack.shift();
}
function advanceGardenTurn(){if(state.builderMode==='cooperation')prototypeData.turn+=1}
function showVoxelFeedback(message){
  placementGrowth.querySelector('b').textContent=message;placementGrowth.hidden=false;
  clearTimeout(showVoxelFeedback.timer);showVoxelFeedback.timer=setTimeout(()=>placementGrowth.hidden=true,1050);
}
function completeVoxelAction(message,feedback=message,effect='success'){
  advanceGardenTurn();savePrototypeData();voxelChoiceMode=null;Object.assign(gardenEditor,{mode:'idle',choice:null,source:null,previewPosition:null,target:null,previewValid:false,dragPointerId:null,dragOffset:null});playGardenEffect(effect);navigator.vibrate?.(12);
  renderGardenBuilder();showToast(message);showVoxelFeedback(feedback);ensureVoxelAnimation();
}
function easyGardenRecommendation(cell=selectedVoxel()){
  const available=voxelActionAvailability(cell);
  if(available.harvest)return {action:'harvest',icon:'🧺',title:'This crop is ready!',help:'Press once to collect it in your garden basket.',button:'Harvest now',maori:'Hauhake ināianei'};
  if(available.water)return {action:'water',icon:'💧',title:'Help this plant grow',help:'Each gentle watering moves it one clear step closer to harvest.',button:'Water and grow',maori:'Whakainu kia tipu'};
  if(available.plant)return {action:'plant',icon:'🌱',title:'Let’s plant a seed',help:'Press the big button, then choose the plant picture you like.',button:'Choose a plant',maori:'Kōwhiria he tipu'};
  if(cell?.terrain==='grass'&&!cell.crop&&!cell.decoration)return {action:'prepare',icon:'🟫',title:'Make a planting place',help:'One press turns this grass block into soft garden soil.',button:'Make planting soil',maori:'Hanga oneone whakatō'};
  return {action:'find',icon:'🔎',title:'Let the garden help',help:'We will find the easiest useful garden job for you.',button:'Find my next step',maori:'Kimihia te mahi whai muri'};
}
function renderEasyGardenGuide(){
  const cell=selectedVoxel(),recommendation=easyGardenRecommendation(cell),stage=cell?.crop?.stage||0;
  easyGardenTitle.textContent=recommendation.title;easyGardenHelp.textContent=recommendation.help;
  easyGardenAction.dataset.easyAction=recommendation.action;
  easyGardenAction.innerHTML=`<span aria-hidden="true">${recommendation.icon}</span><b>${recommendation.button}</b><small>${recommendation.maori}</small>`;
  const growth=[['Seed','Kākano',1],['Sprout','Tipu iti',2],['Growing','Tipu haere',3],['Mature','Tipu pakeke',4],['Ready','Kua rite',5]];
  easyGrowthSteps.innerHTML=growth.map(([english,maori,step])=>`<span class="${stage>=step?'done':''}${stage===step?' current':''}"><i aria-hidden="true">${stage>=step?'✓':step}</i><b>${english}</b><small>${maori}</small></span>`).join('');
  easyGrowthSteps.hidden=!cell?.crop;
}
function chooseNextHelpfulCell(){
  const cells=voxelWorldFor().cells;
  const cell=cells.find(entry=>entry.crop?.stage===5)||cells.find(entry=>entry.crop&&entry.crop.stage<5)||cells.find(entry=>['soil','raised'].includes(entry.terrain)&&!entry.crop&&!entry.decoration)||cells.find(entry=>entry.terrain==='grass'&&!entry.crop&&!entry.decoration);
  if(!cell){showToast('Your garden is full of lovely things. Choose Save and Finish when you are ready.');return null}
  selectedVoxelCell={x:cell.x,y:cell.y};voxelChoiceMode=null;renderGardenBuilder();
  gardenCanvas.focus({preventScroll:true});showVoxelFeedback('Here is your next easy garden step.');return cell;
}
function prepareSelectedSoil(){
  const cell=selectedVoxel(),price=voxelBuildChoices.find(item=>item.id==='soil').price;
  if(cell?.terrain!=='grass'||cell.crop||cell.decoration){chooseNextHelpfulCell();return}
  if(walletFor()<price){showToast('Complete a gentle movement to earn one Garden Token.');return}
  snapshotVoxelUndo();setWallet(walletFor()-price);cell.terrain='soil';cell.paidTerrainPrice=price;
  completeVoxelAction('Planting soil is ready · Kua rite te oneone.','Lovely — now press Choose a plant.','build');
}
function growGardenSurprise(){
  const cells=voxelWorldFor().cells;
  let target=cells.find(cell=>['soil','raised'].includes(cell.terrain)&&!cell.crop&&!cell.decoration);
  const needsSoil=!target;
  if(!target)target=cells.find(cell=>cell.terrain==='grass'&&!cell.crop&&!cell.decoration);
  if(!target){showToast('Your garden is full of lovely things. Try Water or Harvest.');chooseNextHelpfulCell();return}
  const soilPrice=needsSoil?voxelBuildChoices.find(item=>item.id==='soil').price:0;
  const affordable=Object.entries(voxelPlants).filter(([,plant])=>plant.price+soilPrice<=walletFor());
  if(!affordable.length){showToast('Complete a gentle movement to earn Garden Tokens.');return}
  const [kind,plant]=affordable[Math.floor(Math.random()*affordable.length)];
  snapshotVoxelUndo();selectedVoxelCell={x:target.x,y:target.y};
  if(needsSoil){target.terrain='soil';target.paidTerrainPrice=soilPrice}
  target.crop={kind,stage:1,waterCount:0,paidPrice:plant.price};target.decoration=null;
  setWallet(walletFor()-plant.price-soilPrice);gardenAppearances.push({x:target.x,y:target.y,started:performance.now(),kind:'plant'});emitVoxelParticles('plant');
  completeVoxelAction(`Surprise! ${plant.name} is planted.`,`A cheerful ${plant.name} seed joined your garden.`,'plant');
}
function renderVoxelSelection(){
  const cell=selectedVoxel(),[heading,detail]=describeVoxelCell(cell),availability=voxelActionAvailability(cell);
  voxelSelectedTitle.textContent=heading;voxelSelectedState.textContent=detail;
  const occupied=Boolean(cell.crop||cell.decoration||cell.terrain!=='grass');
  voxelSelectionLabel.hidden=!['preview','move'].includes(gardenEditor.mode);
  if(!voxelSelectionLabel.hidden){voxelSelectionLabel.querySelector('b').textContent=!gardenEditor.hasDragged?'Drag to choose its place':gardenEditor.previewValid?'Ready to place':'Position not available';voxelSelectionLabel.querySelector('span').textContent=!gardenEditor.hasDragged?'Nothing is placed automatically. Grab the item and move it where you want it.':gardenEditor.previewValid?'The item will be saved exactly at the glowing position.':'A red ring marks an invalid position; the item has not been moved automatically.'}
  gardenObjectMenu.hidden=!(gardenEditor.mode==='selected'&&occupied);
  rotateGardenObject.hidden=cell?.decoration!=='bench';
  if(!gardenObjectMenu.hidden){gardenObjectName.textContent=heading;rotateGardenObject.setAttribute('aria-label',`Rotate ${heading.split(' · ')[0]} 45 degrees. Current direction ${normaliseChairRotation(cell.itemRotation)} degrees.`)}
  const placing=['preview','move'].includes(gardenEditor.mode);
  gardenPlacementPanel.hidden=!placing;
  if(placing){
    gardenPreviewName.textContent=gardenEditor.choice?.item?.name||'Garden item';
    gardenPreviewHelp.textContent=!gardenEditor.hasDragged?'Grab this item and drag it to the place you choose.':gardenEditor.previewValid?'It will stay exactly where you released it. Press Place here to save.':'That position is not available. Drag the item to a clear part of the garden.';
    placeGardenChoice.disabled=!gardenEditor.previewValid||!gardenEditor.hasDragged;
  }
  placementHint.textContent=['preview','move'].includes(gardenEditor.mode)?'Grab the visible item and drag it freely. Press Place here when you are happy.':'Tap a plant or garden object to change it.';
  gardenCanvas.setAttribute('aria-label',placing?`My garden. ${gardenPreviewName.textContent}. Drag the preview freely, then press Place here. ${gardenEditor.previewValid?'The current position is available.':'The current position is not available.'}`:`My garden. ${heading}. ${detail}. Use arrow keys to choose another garden area.`);
  voxelActionButtons.forEach(button=>{
    const enabled=availability[button.dataset.gardenAction];button.disabled=!enabled;
    const active=voxelChoiceMode===button.dataset.gardenAction;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));
  });
}
function catalogueChoices(){
  return (gardenCategoryChoices[gardenEditor.category]||gardenCategoryChoices.plants).map(([kind,id])=>{
    const item=kind==='plant'?voxelPlants[id]:kind==='build'?voxelBuildChoices.find(entry=>entry.id===id):voxelDecorations.find(entry=>entry.id===id);
    return {...item,id,kind};
  }).filter(item=>item.name);
}
function renderVoxelCatalogue(){
  const choices=catalogueChoices();
  gardenChoiceTitle.textContent=gardenEditor.collection?'My collection · Aku hua':'Choose something you love';
  gardenChoiceHelp.textContent=gardenEditor.collection?'Your harvested garden produce is saved here.':'Tap one large picture to preview it in your garden.';
  if(gardenEditor.collection){gardenCatalogue.innerHTML='';return}
  gardenCatalogue.innerHTML=choices.map(item=>{
    const affordable=walletFor()>=item.price;
    return `<button type="button" class="voxel-choice" data-voxel-choice="${item.id}" data-choice-kind="${item.kind}" ${affordable?'':'disabled'}><canvas class="voxel-choice-preview" width="168" height="126" aria-hidden="true"></canvas><span><b>${item.name}</b><small>${item.maori}</small><i>${item.price} token${item.price===1?'':'s'}</i></span></button>`;
  }).join('');
  requestAnimationFrame(drawVoxelChoicePreviews);
}
function renderGardenCollection(){
  const inventory=voxelWorldFor().inventory;
  gardenCollection.innerHTML=Object.entries(voxelPlants).map(([id,plant])=>`<div class="inventory-slot${inventory[id]?' filled':''}"><span class="inventory-swatch" style="--crop-colour:${plant.accent}" aria-hidden="true"></span><b>${inventory[id]||0}</b><small>${plant.name}</small></div>`).join('');
}
function renderGardenBuilder(){
  builderTokens.textContent=fa(walletFor());renderBuilderProgress();renderVoxelSelection();renderEasyGardenGuide();renderVoxelCatalogue();renderGardenCollection();
  drawerTokens.textContent=fa(walletFor());gardenCollectionPanel.hidden=!gardenEditor.collection;
  gardenCategories.querySelectorAll('[data-garden-category]').forEach(button=>button.classList.toggle('active',button.dataset.gardenCategory===gardenEditor.category));
  gardenSound.setAttribute('aria-pressed',String(gardenSoundEnabled));gardenSound.textContent=gardenSoundEnabled?'Sounds on · Oro āe':'Sounds off · Oro kāo';
  undoGarden.disabled=!voxelUndoStack.some(entry=>entry.mode===state.builderMode);
  if(state.builderMode==='cooperation'){const names=['Aroha','Wiremu','Mere'];turnName.textContent=names[prototypeData.turn%names.length]}
  renderVoxelGarden(performance.now());
}

function drawLeaf(context,x,y,rx,ry,angle,colour){
  context.save();context.translate(x,y);context.rotate(angle);context.fillStyle=colour;context.beginPath();context.ellipse(0,0,rx,ry,0,0,Math.PI*2);context.fill();context.strokeStyle='rgba(36,89,52,.22)';context.lineWidth=Math.max(.7,rx*.1);context.beginPath();context.moveTo(-rx*.72,0);context.lineTo(rx*.72,0);context.stroke();context.restore();
}
function drawFlower(context,x,y,radius,petal,centre='#76542f',petals=7){
  for(let index=0;index<petals;index++){const angle=index/petals*Math.PI*2;drawLeaf(context,x+Math.cos(angle)*radius*.65,y+Math.sin(angle)*radius*.5,radius*.65,radius*.34,angle,petal)}
  context.fillStyle=centre;context.beginPath();context.arc(x,y,radius*.42,0,Math.PI*2);context.fill();
}
function drawGardenSprite(context,id,cx,baseY,size){
  const accessoryCell=gardenAccessoryCells[id],sheet=accessoryCell?gardenAccessorySheet:gardenSpriteSheet,cell=accessoryCell||gardenSpriteCells[id],columns=accessoryCell?2:4,rows=accessoryCell?2:3;
  if(!cell||(accessoryCell?!gardenAccessoriesReady:!gardenSpritesReady))return false;
  const sourceWidth=sheet.naturalWidth/columns,sourceHeight=sheet.naturalHeight/rows;
  context.save();context.filter='saturate(.9) brightness(.96) contrast(.96)';context.drawImage(sheet,cell[0]*sourceWidth,cell[1]*sourceHeight,sourceWidth,sourceHeight,cx-size/2,baseY-size,size,size);context.restore();return true;
}
function drawGardenContactShadow(context,cx,cy,width,height=.24,alpha=.22){
  const shadow=context.createRadialGradient(cx,cy,1,cx,cy,width);shadow.addColorStop(0,`rgba(26,42,25,${alpha})`);shadow.addColorStop(.58,`rgba(26,42,25,${alpha*.55})`);shadow.addColorStop(1,'rgba(26,42,25,0)');context.fillStyle=shadow;context.beginPath();context.ellipse(cx,cy,width,width*height,0,0,Math.PI*2);context.fill();
}
function resizeVoxelCanvas(){
  const rect=voxelGardenCanvas.getBoundingClientRect();if(rect.width<20||rect.height<20)return false;
  const dpr=Math.min(window.devicePixelRatio||1,2),width=Math.round(rect.width),height=Math.round(rect.height),backingW=Math.round(width*dpr),backingH=Math.round(height*dpr);
  if(voxelGardenCanvas.width!==backingW||voxelGardenCanvas.height!==backingH){voxelGardenCanvas.width=backingW;voxelGardenCanvas.height=backingH}
  voxelContext.setTransform(dpr,0,0,dpr,0,0);
  const tileW=Math.max(58,Math.min(112,width/8.7)),tileH=tileW*.44;
  voxelMetrics={width,height,dpr,tileW,tileH,blockH:tileW*.18,originX:width/2,originY:height*.42};return true;
}
function gardenDepthScale(y){return .64+(y/(VOXEL_ROWS-1))*.5}
function gardenNaturalOffset(x,y,metrics=voxelMetrics){
  const horizontal=(((x*37+y*61+13)%19)-9)/9,vertical=(((x*53+y*29+7)%17)-8)/8;
  return {x:horizontal*metrics.tileW*.11,y:vertical*metrics.tileH*.09};
}
function voxelCellCentre(x,y,metrics=voxelMetrics){
  const depth=y/(VOXEL_ROWS-1),left=metrics.width*(.27-depth*.15),right=metrics.width*(.73+depth*.15);
  const offset=gardenNaturalOffset(x,y,metrics);
  return {x:left+(right-left)*(x/(VOXEL_COLS-1))+offset.x,y:metrics.height*(.42+depth*.35)+offset.y,scale:gardenDepthScale(y)};
}
function applyGardenCamera(context){
  const centreX=voxelMetrics.width/2,centreY=voxelMetrics.height*.58;
  context.translate(centreX+gardenCamera.panX*voxelMetrics.width*.13,centreY);context.scale(gardenCamera.zoom,gardenCamera.zoom);context.translate(-centreX,-centreY);
}
function screenToGardenPoint(x,y){
  const centreX=voxelMetrics.width/2,centreY=voxelMetrics.height*.58;
  return {x:(x-centreX-gardenCamera.panX*voxelMetrics.width*.13)/gardenCamera.zoom+centreX,y:(y-centreY)/gardenCamera.zoom+centreY};
}
function pointerToGardenPoint(clientX,clientY){
  const rect=voxelGardenCanvas.getBoundingClientRect();
  return screenToGardenPoint(clientX-rect.left,clientY-rect.top);
}
function gardenDepthScaleAtPoint(y,metrics=voxelMetrics){
  const depth=Math.max(0,Math.min(1,(y/metrics.height-.42)/.35));return .64+depth*.5;
}
function gardenPointFromPosition(position,metrics=voxelMetrics){
  return position&&Number.isFinite(position.x)&&Number.isFinite(position.y)?{x:position.x*metrics.width,y:position.y*metrics.height}:null;
}
function gardenPositionFromPoint(point,metrics=voxelMetrics){return {x:point.x/metrics.width,y:point.y/metrics.height}}
function normaliseChairRotation(value=0){
  const rotation=Number.isFinite(value)?value:0;return ((Math.round(rotation/45)*45)%360+360)%360;
}
function gardenCellPosition(cell){
  if(cell?.itemPosition&&Number.isFinite(cell.itemPosition.x)&&Number.isFinite(cell.itemPosition.y))return cell.itemPosition;
  if(!cell)return null;return gardenPositionFromPoint(voxelCellCentre(cell.x,cell.y));
}
function chairFacingRotation(fromPosition,toPosition){
  if(!fromPosition||!toPosition)return 0;
  return normaliseChairRotation(Math.atan2((toPosition.y-fromPosition.y)*1.2,toPosition.x-fromPosition.x)*180/Math.PI);
}
function nearestGardenChair(position,exclude=null){
  if(!position)return null;
  return voxelWorldFor().cells.filter(cell=>cell.decoration==='bench'&&!(exclude&&cell.x===exclude.x&&cell.y===exclude.y)).map(cell=>{const chairPosition=gardenCellPosition(cell),dx=chairPosition.x-position.x,dy=(chairPosition.y-position.y)*1.2;return {cell,position:chairPosition,distance:Math.hypot(dx,dy)}}).filter(entry=>entry.distance<=.34).sort((a,b)=>a.distance-b.distance)[0]||null;
}
function suggestedChairRotation(position,exclude=null){
  const neighbour=nearestGardenChair(position,exclude);return neighbour?chairFacingRotation(position,neighbour.position):0;
}
function arrangeNearbyGardenChairs(cell,position=gardenCellPosition(cell)){
  if(cell?.decoration!=='bench'||!position)return false;
  const neighbour=nearestGardenChair(position,cell);if(!neighbour)return false;
  if(!cell.chairRotationManual)cell.itemRotation=chairFacingRotation(position,neighbour.position);
  if(!neighbour.cell.chairRotationManual)neighbour.cell.itemRotation=chairFacingRotation(neighbour.position,position);
  return true;
}
function gardenItemCentre(cell,metrics=voxelMetrics){
  const saved=gardenPointFromPosition(cell?.itemPosition,metrics);if(saved)return {...saved,scale:gardenDepthScaleAtPoint(saved.y,metrics)};
  return voxelCellCentre(cell.x,cell.y,metrics);
}
function gardenTerrainCentre(cell,metrics=voxelMetrics){
  const saved=gardenPointFromPosition(cell?.terrainPosition,metrics);if(saved)return {...saved,scale:gardenDepthScaleAtPoint(saved.y,metrics)};
  return voxelCellCentre(cell.x,cell.y,metrics);
}
function gardenPreviewPoint(metrics=voxelMetrics){return gardenPointFromPosition(gardenEditor.previewPosition,metrics)}
function gardenPointInsidePlacementArea(point){return Boolean(point&&point.x>=voxelMetrics.width*.08&&point.x<=voxelMetrics.width*.92&&point.y>=voxelMetrics.height*.34&&point.y<=voxelMetrics.height*.88)}
function gardenTargetCellForPoint(point,choice=gardenEditor.choice){
  if(!point||!choice)return null;
  const cells=voxelWorldFor().cells,compatible=cells.filter(cell=>canPlaceGardenChoice(choice,cell));
  if(!compatible.length)return null;
  const unusedGrass=compatible.filter(cell=>cell.terrain==='grass'&&!cell.crop&&!cell.decoration),movingSource=gardenEditor.mode==='move'?compatible.find(cell=>cell.x===gardenEditor.source?.x&&cell.y===gardenEditor.source?.y):null,pool=unusedGrass.length?unusedGrass:(movingSource?[movingSource]:[]);
  return [...pool].sort((a,b)=>{const ac=voxelCellCentre(a.x,a.y),bc=voxelCellCentre(b.x,b.y),ad=(point.x-ac.x)**2+(point.y-ac.y)**2*2.2,bd=(point.x-bc.x)**2+(point.y-bc.y)**2*2.2;return ad-bd})[0]||null;
}
function updateGardenPreviewPoint(point){
  if(!point)return;
  gardenEditor.previewPosition=gardenPositionFromPoint(point);gardenEditor.target=gardenTargetCellForPoint(point,gardenEditor.choice);
  gardenEditor.previewValid=gardenPointInsidePlacementArea(point)&&Boolean(gardenEditor.target);
  if(gardenEditor.choice?.kind==='decorate'&&gardenEditor.choice.id==='bench'){
    const source=gardenEditor.mode==='move'?voxelWorldFor().cells.find(cell=>cell.x===gardenEditor.source?.x&&cell.y===gardenEditor.source?.y):null;
    gardenEditor.previewRotation=source?.chairRotationManual?normaliseChairRotation(source.itemRotation):suggestedChairRotation(gardenEditor.previewPosition,gardenEditor.source);
  }
  if(gardenEditor.target)selectedVoxelCell={x:gardenEditor.target.x,y:gardenEditor.target.y};
}
function gardenPreviewHitTest(point){
  const centre=gardenPreviewPoint();if(!centre||!point)return false;
  const choice=gardenEditor.choice,depth=gardenDepthScaleAtPoint(centre.y),tree=choice?.kind==='decorate'&&['tree','kowhai'].includes(choice.id),wide=choice?.kind==='decorate'&&['bench','fence','flower-patch'].includes(choice.id);
  let widthFactor=.72,heightFactor=1.05;if(choice?.kind==='build')heightFactor=.7;if(tree){widthFactor=.95;heightFactor=1.8}else if(wide)widthFactor=.9;
  const rx=Math.max(46/gardenCamera.zoom,voxelMetrics.tileW*depth*widthFactor),height=Math.max(68/gardenCamera.zoom,voxelMetrics.tileW*depth*heightFactor);
  return point.x>=centre.x-rx&&point.x<=centre.x+rx&&point.y>=centre.y-height&&point.y<=centre.y+Math.max(28/gardenCamera.zoom,height*.22);
}
function drawVoxelTerrain(context,cell,cx,cy,metrics=voxelMetrics,timestamp=0){
  if(['grass','soil','raised'].includes(cell.terrain))return;
  const depth=Number.isFinite(cell.y)?gardenDepthScale(cell.y):.9,unit=metrics.tileW/72,w=metrics.tileW*depth,h=metrics.tileH*depth,seed=(cell.x||0)*31+(cell.y||0)*17,angle=((seed%9)-4)*.012;
  context.save();context.fillStyle='rgba(34,48,31,.2)';context.beginPath();context.ellipse(cx+unit*2,cy+h*.28,w*.5,h*.52,angle,0,Math.PI*2);context.fill();
  if(cell.terrain==='stone-path'){
    [-.27,0,.27].forEach((offset,index)=>{context.fillStyle=index%2?'#85887c':'#a19f92';context.beginPath();context.ellipse(cx+w*offset,cy+(index%2?h*.05:-h*.04),w*.18,h*.29,index*.08-.08,0,Math.PI*2);context.fill();context.strokeStyle='rgba(62,68,59,.3)';context.lineWidth=1;context.stroke()});
  }else if(cell.terrain==='wood-path'){
    context.fillStyle='#9d714a';context.beginPath();context.roundRect(cx-w*.46,cy-h*.31,w*.92,h*.62,Math.max(4,unit*4));context.fill();context.strokeStyle='rgba(91,55,31,.38)';context.lineWidth=Math.max(1,unit);[-.25,0,.25].forEach(offset=>{context.beginPath();context.moveTo(cx+w*offset,cy-h*.27);context.lineTo(cx+w*offset,cy+h*.27);context.stroke()});
  }else if(cell.terrain==='water'){
    const ripple=reducedVoxelMotion.matches?0:Math.sin(timestamp/780+seed)*w*.035,water=context.createLinearGradient(cx,cy-h*.4,cx,cy+h*.45);water.addColorStop(0,'#76b1b0');water.addColorStop(1,'#376f72');context.fillStyle=water;context.beginPath();context.ellipse(cx,cy,w*.66,h*.72,angle,0,Math.PI*2);context.fill();context.strokeStyle='rgba(231,247,238,.6)';context.lineWidth=Math.max(1,unit);context.beginPath();context.ellipse(cx-w*.08+ripple,cy-h*.08,w*.29,h*.16,angle,0,Math.PI*2);context.stroke();context.globalAlpha=.36;context.beginPath();context.ellipse(cx+w*.12-ripple*.5,cy+h*.12,w*.18,h*.09,-angle,0,Math.PI*2);context.stroke();
  }
  context.restore();
}
function drawTerrainConnections(context,cells,timestamp){
  const world=new Map(cells.map(cell=>[`${cell.x},${cell.y}`,cell]));
  const styles={water:['#447f80',.84],'wood-path':['#8f6746',.58]};
  cells.forEach(cell=>{
    const style=styles[cell.terrain];if(!style)return;
    [[1,0],[0,1]].forEach(([dx,dy])=>{
      const neighbour=world.get(`${cell.x+dx},${cell.y+dy}`);if(neighbour?.terrain!==cell.terrain)return;
      const from=gardenTerrainCentre(cell),to=gardenTerrainCentre(neighbour),depth=(from.scale+to.scale)/2;
      context.save();context.strokeStyle=style[0];context.globalAlpha=cell.terrain==='water'?.88:.96;context.lineCap='round';context.lineWidth=voxelMetrics.tileH*depth*style[1];context.beginPath();context.moveTo(from.x,from.y);context.quadraticCurveTo((from.x+to.x)/2+Math.sin(timestamp/1800+cell.x)*2,(from.y+to.y)/2, to.x,to.y);context.stroke();context.restore();
    });
  });
}
function drawVoxelCrop(context,cx,cy,crop,scale=1){
  const plant=voxelPlants[crop.kind],stage=crop.stage;if(!plant||!stage)return;
  const unit=Math.max(4.5,7.5*scale),baseY=cy-3*scale,height=unit*(stage*.78+.55);
  drawGardenContactShadow(context,cx,baseY+unit*.42,unit*(1.5+stage*.28),.22,.18);
  if(stage===1){context.fillStyle='#d8b47a';context.beginPath();context.ellipse(cx,baseY,unit*.48,unit*.28,-.25,0,Math.PI*2);context.fill();context.strokeStyle='#f2d4a5';context.lineWidth=1;context.stroke();return}
  if(gardenSpritesReady){const growthScale=[0,0,.38,.58,.79,1][stage],spriteSize=unit*10.2*growthScale;context.save();context.globalAlpha=stage===2?.88:1;drawGardenSprite(context,crop.kind,cx,baseY+unit*.5,spriteSize);context.restore();if(stage===5){const glow=context.createRadialGradient(cx,baseY-height*.55,unit*.5,cx,baseY-height*.55,unit*3.1);glow.addColorStop(0,'rgba(255,239,151,.18)');glow.addColorStop(1,'rgba(255,239,151,0)');context.fillStyle=glow;context.beginPath();context.arc(cx,baseY-height*.55,unit*3.1,0,Math.PI*2);context.fill()}return}
  context.strokeStyle=plant.leaf;context.lineCap='round';context.lineWidth=Math.max(2,unit*.34);context.beginPath();context.moveTo(cx,baseY);context.quadraticCurveTo(cx-unit*.12,baseY-height*.56,cx,baseY-height);context.stroke();
  if(crop.kind==='kumara'){
    for(let n=-2;n<=2;n++){const angle=-1.05+n*.52;drawLeaf(context,cx+Math.sin(angle)*unit*1.25,baseY-height*.48+Math.abs(n)*unit*.22,unit*(.62+stage*.1),unit*.36,angle,plant.leaf)}
    if(stage>=4)[-1,1].forEach(n=>{context.fillStyle=plant.accent;context.beginPath();context.ellipse(cx+n*unit*.72,baseY+unit*.12,unit*.58,unit*.32,n*.2,0,Math.PI*2);context.fill()});
  }else if(crop.kind==='carrot'){
    for(let n=-2;n<=2;n++)drawLeaf(context,cx+n*unit*.25,baseY-height*.52-Math.abs(n)*unit*.08,unit*.75,unit*.2,-Math.PI/2+n*.18,plant.leaf);
    if(stage>=4){context.fillStyle=plant.accent;context.beginPath();context.moveTo(cx-unit*.55,baseY-unit*.08);context.quadraticCurveTo(cx,baseY+unit*1.45,cx+unit*.55,baseY-unit*.08);context.closePath();context.fill()}
  }else if(crop.kind==='sunflower'){
    drawLeaf(context,cx-unit*.48,baseY-height*.45,unit*.7,unit*.3,-.35,plant.leaf);drawLeaf(context,cx+unit*.5,baseY-height*.62,unit*.7,unit*.3,.35,plant.leaf);
    if(stage>=3)drawFlower(context,cx,baseY-height,unit*(stage>=5?1.18:.88),plant.accent,'#76542f',10);
  }else{
    const stems=stage>=4?3:stage>=3?2:1;
    for(let n=0;n<stems;n++){
      const offset=(n-(stems-1)/2)*unit*.9,stemHeight=height*(.82+n*.08);
      context.strokeStyle=plant.leaf;context.lineWidth=Math.max(1.6,unit*.22);context.beginPath();context.moveTo(cx+offset,baseY);context.quadraticCurveTo(cx+offset-unit*.18,baseY-stemHeight*.55,cx+offset,baseY-stemHeight);context.stroke();
      drawLeaf(context,cx+offset-unit*.38,baseY-stemHeight*.48,unit*.55,unit*.25,-.45,plant.leaf);drawLeaf(context,cx+offset+unit*.38,baseY-stemHeight*.68,unit*.55,unit*.25,.45,plant.leaf);
      if(stage>=3&&crop.kind==='nativeFlowers')drawFlower(context,cx+offset,baseY-stemHeight,unit*(stage===5?.72:.55),plant.accent,'#f0c655',6);
      if(stage>=4&&crop.kind==='tomato')[-1,1].forEach(side=>{context.fillStyle=plant.accent;context.beginPath();context.arc(cx+offset+side*unit*.44,baseY-stemHeight*.55,unit*(stage===5?.42:.32),0,Math.PI*2);context.fill()});
      if(crop.kind==='herbs')[-1,1].forEach(side=>drawLeaf(context,cx+offset+side*unit*.35,baseY-stemHeight*.82,unit*.48,unit*.22,side*.55,plant.accent));
    }
  }
  if(stage===5){const glow=context.createRadialGradient(cx,baseY-height*.55,unit*.5,cx,baseY-height*.55,unit*2.7);glow.addColorStop(0,'rgba(255,239,151,.28)');glow.addColorStop(1,'rgba(255,239,151,0)');context.fillStyle=glow;context.beginPath();context.arc(cx,baseY-height*.55,unit*2.7,0,Math.PI*2);context.fill()}
}
function applyChairFacingTransform(context,cx,baseY,rotation=0){
  const radians=normaliseChairRotation(rotation)*Math.PI/180,horizontal=Math.cos(radians),side=Math.sin(radians),flip=horizontal<-.001?-1:1,width=.46+.54*Math.abs(horizontal),skew=side*.16;
  context.translate(cx,baseY);context.transform(flip*width,0,skew,1,0,0);context.translate(-cx,-baseY);
}
function drawVoxelDecoration(context,cx,cy,decoration,scale=1,rotation=0){
  const unit=7.5*scale;
  if(gardenSpritesReady||gardenAccessoriesReady){
    const sizes={tree:18,kowhai:18,bench:11.5,fence:11,'flower-patch':11,'bird-bath':10,planter:10,'watering-can':8.8,'potted-shrub':11.5,'garden-pot':8.8,'shared-marker':10};
    const shadows={tree:6.8,kowhai:6.8,bench:5.8,fence:5.5,'flower-patch':5.4,'bird-bath':4.1,planter:4.7,'watering-can':4,'potted-shrub':5,'garden-pot':4,'shared-marker':4.7};
    drawGardenContactShadow(context,cx,cy+unit*.55,unit*(shadows[decoration]||4.8),.22,['tree','kowhai'].includes(decoration)?.25:.2);
    context.save();if(decoration==='bench')applyChairFacingTransform(context,cx,cy+unit*.5,rotation);const spriteDrawn=drawGardenSprite(context,decoration,cx,cy+unit*.5,unit*(sizes[decoration]||10));context.restore();if(spriteDrawn)return;
  }
  context.save();if(decoration==='bench')applyChairFacingTransform(context,cx,cy,rotation);
  if(['tree','kowhai'].includes(decoration)){
    context.strokeStyle='#795038';context.lineCap='round';context.lineWidth=unit*1.1;context.beginPath();context.moveTo(cx,cy);context.quadraticCurveTo(cx-unit*.25,cy-unit*3.3,cx,cy-unit*5.2);context.stroke();
    [[0,-5.5,1.8],[-1.25,-4.8,1.55],[1.3,-4.7,1.6],[-.7,-6,1.4],[.8,-6.1,1.45]].forEach(([dx,dy,size],index)=>{context.fillStyle=index%2?'#4f8e51':'#639e5b';context.beginPath();context.arc(cx+dx*unit,cy+dy*unit,size*unit,0,Math.PI*2);context.fill()});
    [0,1,2].forEach(index=>drawFlower(context,cx+(index-1)*unit*.85,cy-unit*(5.2+index*.18),unit*.35,'#e35f4e','#f4c456',5));
  }else if(decoration==='bench'){
    context.strokeStyle='#8a5838';context.lineCap='round';context.lineWidth=unit*.72;[-.5,.45].forEach(row=>{context.beginPath();context.moveTo(cx-unit*1.7,cy-unit*(1.05+row));context.lineTo(cx+unit*1.7,cy-unit*(1.05+row));context.stroke()});
    context.lineWidth=unit*.42;[-1.25,1.25].forEach(side=>{context.beginPath();context.moveTo(cx+side*unit,cy-unit*.9);context.lineTo(cx+side*unit,cy+unit*.25);context.stroke()});
  }else if(decoration==='fence'){
    context.strokeStyle='#b37d4e';context.lineCap='round';context.lineWidth=unit*.5;[-1,0,1].forEach(n=>{context.beginPath();context.moveTo(cx+n*unit,cy);context.lineTo(cx+n*unit,cy-unit*2.4);context.stroke()});context.lineWidth=unit*.42;[-.8,-1.65].forEach(level=>{context.beginPath();context.moveTo(cx-unit*1.45,cy+level*unit);context.lineTo(cx+unit*1.45,cy+level*unit);context.stroke()});
  }else if(decoration==='flower-patch'){
    [-1,0,1].forEach((n,index)=>drawVoxelCrop(context,cx+n*unit*.9,cy+Math.abs(n)*unit*.15,{kind:'nativeFlowers',stage:4-index%2},scale*.72));
  }else if(decoration==='bird-bath'){
    context.fillStyle='#919995';context.fillRect(cx-unit*.32,cy-unit*1.65,unit*.64,unit*1.65);context.beginPath();context.ellipse(cx,cy-unit*1.65,unit*1.5,unit*.42,0,0,Math.PI*2);context.fill();context.fillStyle='#70c3d3';context.beginPath();context.ellipse(cx,cy-unit*1.73,unit*1.18,unit*.25,0,0,Math.PI*2);context.fill();
  }else if(decoration==='shared-marker'){
    context.strokeStyle='#744d34';context.lineCap='round';context.lineWidth=unit*.48;[-1,1].forEach(n=>{context.beginPath();context.moveTo(cx+n*unit,cy);context.lineTo(cx+n*unit,cy-unit*2.7);context.stroke()});
    context.fillStyle='#d5a862';context.beginPath();context.roundRect(cx-unit*1.65,cy-unit*3.15,unit*3.3,unit*1.25,unit*.28);context.fill();context.strokeStyle='#2f6f5c';context.lineWidth=unit*.18;context.beginPath();context.moveTo(cx-unit*.9,cy-unit*2.5);context.quadraticCurveTo(cx-unit*.4,cy-unit*3,cx,cy-unit*2.5);context.quadraticCurveTo(cx+unit*.4,cy-unit*2,cx+unit*.9,cy-unit*2.5);context.stroke();
  }
  context.restore();
}
function drawVoxelParticles(context,delta){
  voxelParticles.forEach(particle=>{particle.life-=delta;particle.dx+=particle.vx*delta;particle.dy+=particle.vy*delta;const centre=Number.isFinite(particle.baseX)?{x:particle.baseX,y:particle.baseY}:voxelCellCentre(particle.cellX,particle.cellY),x=centre.x+particle.dx,y=centre.y+particle.dy;context.fillStyle=particle.colour;context.beginPath();if(particle.type==='water'){context.ellipse(x,y,particle.size*.45,particle.size*.8,0,0,Math.PI*2)}else{context.arc(x,y,particle.size*.58,0,Math.PI*2)}context.fill()});
  voxelParticles=voxelParticles.filter(particle=>particle.life>0);
}
function drawNaturalGardenBackdrop(context,width,height,timestamp){
  if(gardenBackdropReady){
    const imageRatio=gardenBackdropImage.naturalWidth/gardenBackdropImage.naturalHeight,canvasRatio=width/height;
    let sourceX=0,sourceY=0,sourceWidth=gardenBackdropImage.naturalWidth,sourceHeight=gardenBackdropImage.naturalHeight;
    if(imageRatio>canvasRatio){sourceWidth=sourceHeight*canvasRatio;sourceX=(gardenBackdropImage.naturalWidth-sourceWidth)/2}else{sourceHeight=sourceWidth/canvasRatio;sourceY=(gardenBackdropImage.naturalHeight-sourceHeight)/2}
    const zoom=gardenCamera.zoom,baseWidth=sourceWidth,baseHeight=sourceHeight;sourceWidth=baseWidth/zoom;sourceHeight=baseHeight/zoom;
    sourceX+=(baseWidth-sourceWidth)/2-gardenCamera.panX*(gardenBackdropImage.naturalWidth-sourceWidth)*.2;sourceY+=(baseHeight-sourceHeight)*.32;
    sourceX=Math.max(0,Math.min(gardenBackdropImage.naturalWidth-sourceWidth,sourceX));sourceY=Math.max(0,Math.min(gardenBackdropImage.naturalHeight-sourceHeight,sourceY));
    context.drawImage(gardenBackdropImage,sourceX,sourceY,sourceWidth,sourceHeight,0,0,width,height);
    const lightDrift=reducedVoxelMotion.matches?0:Math.sin(timestamp/7000)*.018,softLight=context.createLinearGradient(0,0,0,height);softLight.addColorStop(0,`rgba(255,252,236,${.055+lightDrift})`);softLight.addColorStop(1,'rgba(21,63,54,.09)');context.fillStyle=softLight;context.fillRect(0,0,width,height);return;
  }
  const sky=context.createLinearGradient(0,0,0,height);sky.addColorStop(0,'#bde3ec');sky.addColorStop(.57,'#e9f3df');sky.addColorStop(1,'#c9d9aa');context.fillStyle=sky;context.fillRect(0,0,width,height);
  const sun=context.createRadialGradient(width*.82,height*.15,2,width*.82,height*.15,Math.min(width,height)*.12);sun.addColorStop(0,'#fffbe2');sun.addColorStop(.36,'#f5d87a');sun.addColorStop(1,'rgba(245,216,122,0)');context.fillStyle=sun;context.fillRect(0,0,width,height*.42);
  context.fillStyle='#9ebc87';context.beginPath();context.moveTo(0,height*.43);context.bezierCurveTo(width*.16,height*.26,width*.3,height*.48,width*.48,height*.33);context.bezierCurveTo(width*.66,height*.21,width*.8,height*.45,width,height*.28);context.lineTo(width,height*.64);context.lineTo(0,height*.64);context.closePath();context.fill();
  context.fillStyle='#b9cd98';context.beginPath();context.moveTo(0,height*.5);context.bezierCurveTo(width*.22,height*.34,width*.38,height*.57,width*.58,height*.39);context.bezierCurveTo(width*.74,height*.29,width*.88,height*.52,width,height*.4);context.lineTo(width,height*.72);context.lineTo(0,height*.72);context.closePath();context.fill();
  const drift=reducedVoxelMotion.matches?0:Math.sin(timestamp/4800)*7;
  [[.16,.16,1],[.52,.11,.78]].forEach(([x,y,scale])=>{context.fillStyle='rgba(255,255,255,.72)';context.beginPath();context.ellipse(width*x+drift,height*y,28*scale,12*scale,0,0,Math.PI*2);context.ellipse(width*x+23*scale+drift,height*y+2,22*scale,10*scale,0,0,Math.PI*2);context.ellipse(width*x-21*scale+drift,height*y+4,18*scale,8*scale,0,0,Math.PI*2);context.fill()});
  context.fillStyle='rgba(40,74,52,.13)';context.beginPath();context.ellipse(width/2,height*.75,Math.min(width*.46,405),height*.18,0,0,Math.PI*2);context.fill();
}
function drawButterfly(context,x,y,size,colour,phase){
  const flutter=reducedVoxelMotion.matches?.65:.45+Math.abs(Math.sin(phase))*.6;
  context.save();context.translate(x,y);context.rotate(Math.sin(phase*.37)*.12);context.fillStyle=colour;context.globalAlpha=.88;
  context.beginPath();context.ellipse(-size*.52,0,size*.7*flutter,size*.48,-.45,0,Math.PI*2);context.ellipse(size*.52,0,size*.7*flutter,size*.48,.45,0,Math.PI*2);context.fill();
  context.fillStyle='#5d4934';context.globalAlpha=1;context.beginPath();context.ellipse(0,0,size*.14,size*.6,0,0,Math.PI*2);context.fill();context.restore();
}
function drawGardenWildlife(context,width,height,timestamp){
  const time=reducedVoxelMotion.matches?0:timestamp;
  const butterflyWindow=(time/1000)%28;
  if(reducedVoxelMotion.matches||butterflyWindow<11){
    const fade=reducedVoxelMotion.matches?.48:Math.min(1,butterflyWindow/2,(11-butterflyWindow)/2);
    context.save();context.globalAlpha=Math.max(0,fade);[[.24,.35,6,'#e7984d',0],[.72,.4,5,'#d56b62',2.2]].forEach(([bx,by,size,colour,phase],index)=>drawButterfly(context,width*bx+Math.sin(time/2100+index)*18,height*by+Math.cos(time/1700+index)*8,size,colour,time/180+phase));context.restore();
  }
  const birdWindow=(time/1000+9)%36;
  if(reducedVoxelMotion.matches||birdWindow<13){
    const fade=reducedVoxelMotion.matches?.55:Math.min(1,birdWindow/2,(13-birdWindow)/2),birdX=width*.12,birdY=height*.36;context.save();context.globalAlpha=Math.max(0,fade);context.translate(birdX,birdY);context.fillStyle='#28514c';context.beginPath();context.ellipse(0,0,9,6,-.18,0,Math.PI*2);context.fill();context.fillStyle='#f4f0db';context.beginPath();context.ellipse(-2,2,4,3,-.2,0,Math.PI*2);context.fill();context.fillStyle='#28514c';context.beginPath();context.arc(7,-4,4,0,Math.PI*2);context.fill();context.strokeStyle='#28514c';context.lineWidth=2;for(let n=-1;n<=1;n++){context.beginPath();context.moveTo(-7,1);context.lineTo(-16-n*3,6+n*2);context.stroke()}context.fillStyle='#d89145';context.beginPath();context.moveTo(11,-4);context.lineTo(16,-2);context.lineTo(11,-1);context.closePath();context.fill();context.restore();
  }
}
function gardenCellOccupied(cell){return Boolean(cell?.crop||cell?.decoration||cell?.terrain!=='grass')}
function canPlaceGardenChoice(choice,cell){
  if(!choice||!cell)return false;
  if(gardenEditor.mode==='move')return !gardenCellOccupied(cell)||(cell.x===gardenEditor.source?.x&&cell.y===gardenEditor.source?.y);
  if(choice.kind==='plant')return !cell.crop&&!cell.decoration&&!['water','stone-path','wood-path'].includes(cell.terrain);
  if(choice.kind==='build')return !cell.crop&&!cell.decoration&&['grass','soil','raised','stone-path','wood-path'].includes(cell.terrain);
  return !cell.crop&&!cell.decoration&&cell.terrain!=='water';
}
function gardenSmoothstep(start,end,value){
  const progress=Math.max(0,Math.min(1,(value-start)/(end-start)));return progress*progress*(3-2*progress);
}
function gardenAppearanceFor(cell){return gardenAppearances.find(entry=>entry.x===cell.x&&entry.y===cell.y)}
function drawPlantingGround(context,cell,centre,timestamp,appearance){
  if(appearance?.kind!=='plant')return;
  const progress=Math.max(0,Math.min(1,(timestamp-appearance.started)/1650)),depth=gardenDepthScale(cell.y),width=voxelMetrics.tileW*depth,height=voxelMetrics.tileH*depth;
  const hole=gardenSmoothstep(.08,.23,progress)*(1-gardenSmoothstep(.43,.66,progress));
  if(hole>0){context.save();context.globalAlpha=.66*hole;context.fillStyle='#302117';context.beginPath();context.ellipse(centre.x,centre.y-height*.02,width*.22*hole,height*.17*hole,-.04,0,Math.PI*2);context.fill();context.restore()}
  const settle=gardenSmoothstep(.48,.64,progress)*(1-gardenSmoothstep(.84,1,progress));
  if(settle>0){context.save();context.globalAlpha=.56*settle;context.strokeStyle='#b8875e';context.lineWidth=Math.max(1.5,width*.018);[-1,1].forEach(side=>{context.beginPath();context.ellipse(centre.x+side*width*.13,centre.y,width*.18,height*.14,0,side<0?.18:Math.PI+.18,side<0?Math.PI-.18:Math.PI*2-.18);context.stroke()});context.restore()}
}
function drawGardenItem(context,cell,centre,scale,timestamp,alpha=1){
  const phase=timestamp/1650+cell.x*.7+cell.y*.41,sway=reducedVoxelMotion.matches?0:Math.sin(phase)*.012;
  context.save();context.globalAlpha*=alpha;context.translate(centre.x,centre.y);context.rotate(sway);context.translate(-centre.x,-centre.y);
  const appearance=gardenAppearanceFor(cell),progress=appearance?Math.min(1,(timestamp-appearance.started)/(appearance.kind==='plant'?1650:1050)):1,eased=1-(1-progress)**3;
  const gardenGrowth=1+Math.min(.07,(prototypeData.profile.sessions+voxelWorldFor().harvestCount)*.004);
  if(cell.crop){
    const reveal=appearance?.kind==='plant'?gardenSmoothstep(.26,.64,progress):1;
    if(reveal>0){context.globalAlpha*=reveal;drawVoxelCrop(context,centre.x,centre.y-voxelMetrics.tileH*.1,cell.crop,scale*gardenGrowth*(.28+reveal*.72))}
  }
  if(cell.decoration&&progress>.12)drawVoxelDecoration(context,centre.x,centre.y-voxelMetrics.tileH*.08,cell.decoration,scale*(.68+eased*.32),cell.itemRotation||0);
  context.restore();
}
function drawGardenPlacementPreview(context,timestamp){
  if(!['preview','move'].includes(gardenEditor.mode)||!gardenEditor.choice)return;
  const centre=gardenPreviewPoint();if(!centre)return;
  const valid=gardenEditor.previewValid,depth=gardenDepthScaleAtPoint(centre.y),scale=(voxelMetrics.tileW/76)*depth;
  context.save();context.globalAlpha=.94;context.fillStyle=valid?'rgba(234,251,217,.38)':'rgba(255,218,210,.48)';context.strokeStyle=valid?'#f9f0a5':'#9f332e';context.lineWidth=valid?4:5;context.setLineDash(valid?[]:[9,7]);context.beginPath();context.ellipse(centre.x,centre.y,Math.max(38,voxelMetrics.tileW*depth*.46),Math.max(15,voxelMetrics.tileH*depth*.38),0,0,Math.PI*2);context.fill();context.stroke();context.setLineDash([]);context.restore();
  context.save();context.globalAlpha=valid?.78:.58;context.shadowColor=valid?'rgba(255,255,235,.9)':'rgba(123,35,30,.65)';context.shadowBlur=18;
  if(gardenEditor.choice.kind==='plant')drawVoxelCrop(context,centre.x,centre.y-voxelMetrics.tileH*.1,{kind:gardenEditor.choice.id,stage:5},scale);
  else if(gardenEditor.choice.kind==='decorate')drawVoxelDecoration(context,centre.x,centre.y-voxelMetrics.tileH*.08,gardenEditor.choice.id,scale,gardenEditor.previewRotation||0);
  else drawVoxelTerrain(context,{...(gardenEditor.target||{x:4,y:3}),terrain:gardenEditor.choice.id},centre.x,centre.y,voxelMetrics,timestamp);
  context.restore();
}
function renderVoxelGarden(timestamp=0){
  if(!resizeVoxelCanvas())return;
  const context=voxelContext,{width,height}=voxelMetrics,delta=Math.min(40,voxelLastFrame?timestamp-voxelLastFrame:16);voxelLastFrame=timestamp;
  context.clearRect(0,0,width,height);
  drawNaturalGardenBackdrop(context,width,height,timestamp);
  drawGardenWildlife(context,width,height,timestamp);
  context.save();applyGardenCamera(context);
  const cells=[...voxelWorldFor().cells];drawTerrainConnections(context,cells,timestamp);
  cells.forEach(cell=>{
    const centre=gardenTerrainCentre(cell),itemCentre=gardenItemCentre(cell),appearance=gardenAppearanceFor(cell),planting=appearance?.kind==='plant',progress=planting?Math.max(0,Math.min(1,(timestamp-appearance.started)/1650)):1;
    if(!planting||progress>.05){context.save();if(planting)context.globalAlpha=gardenSmoothstep(.05,.25,progress);drawVoxelTerrain(context,cell,centre.x,centre.y,voxelMetrics,timestamp);context.restore()}
    drawPlantingGround(context,cell,itemCentre,timestamp,appearance);
  });
  cells.sort((a,b)=>gardenItemCentre(a).y-gardenItemCentre(b).y||a.x-b.x).forEach(cell=>{const centre=gardenItemCentre(cell),scale=(voxelMetrics.tileW/76)*centre.scale,isMovingSource=gardenEditor.mode==='move'&&cell.x===gardenEditor.source?.x&&cell.y===gardenEditor.source?.y;drawGardenItem(context,cell,centre,scale,timestamp,isMovingSource?.12:1)});
  drawGardenPlacementPreview(context,timestamp);
  drawVoxelParticles(context,delta);
  context.restore();gardenAppearances=gardenAppearances.filter(entry=>timestamp-entry.started<1850);
}
function ensureVoxelAnimation(){
  if(voxelAnimationFrame)return;
  const frame=timestamp=>{voxelAnimationFrame=null;if(state.screen!=='builder'){voxelLastFrame=0;return}renderVoxelGarden(timestamp);if(!reducedVoxelMotion.matches||voxelParticles.length)voxelAnimationFrame=requestAnimationFrame(frame)};
  voxelAnimationFrame=requestAnimationFrame(frame);
}
function voxelCellFromPointer(clientX,clientY){
  const point=pointerToGardenPoint(clientX,clientY);
  const cells=[...voxelWorldFor().cells].sort((a,b)=>b.y-a.y||b.x-a.x);
  const objectHit=cells.find(cell=>{if(!cell.crop&&!cell.decoration)return false;const centre=gardenItemCentre(cell),depth=centre.scale,tree=['tree','kowhai'].includes(cell.decoration),wide=['bench','fence','flower-patch'].includes(cell.decoration),rx=Math.max(38/gardenCamera.zoom,voxelMetrics.tileW*depth*(tree?.9:wide?.78:.62)),ry=Math.max(52/gardenCamera.zoom,voxelMetrics.tileW*depth*(tree?1.1:.68)),objectY=centre.y-ry*.52,dx=(point.x-centre.x)/rx,dy=(point.y-objectY)/ry;return dx*dx+dy*dy<=1});
  if(objectHit)return objectHit;
  const directHit=cells.find(cell=>{const centre=gardenTerrainCentre(cell),depth=centre.scale,dx=(point.x-centre.x)/(voxelMetrics.tileW*depth*.5),dy=(point.y-centre.y)/(voxelMetrics.tileH*depth*.7);return dx*dx+dy*dy<=1});
  if(directHit)return directHit;
  return null;
}
function emitVoxelParticles(type){
  const colours=type==='water'?['#8ee7f0','#55bfd8','#d5fbff']:type==='plant'?['#745036','#8d684b','#77a367']:type==='settle'?['#745036','#8d684b','#a77b58']:['#f0ca4c','#e88b50','#7fc268'];
  const count=reducedVoxelMotion.matches?4:type==='settle'?5:type==='plant'?7:14;
  const cell=selectedVoxel(),centre=cell&&(cell.crop||cell.decoration||cell.itemPosition)?gardenItemCentre(cell):cell?gardenTerrainCentre(cell):voxelCellCentre(selectedVoxelCell.x,selectedVoxelCell.y);
  for(let index=0;index<count;index++)voxelParticles.push({type,cellX:selectedVoxelCell.x,cellY:selectedVoxelCell.y,baseX:centre.x,baseY:centre.y,dx:(Math.random()-.5)*voxelMetrics.tileW*.62,dy:type==='water'?-35-Math.random()*45:0,vx:(Math.random()-.5)*.025,vy:type==='water'?.075+Math.random()*.025:-.035-Math.random()*.04,life:type==='water'?700+Math.random()*250:650+Math.random()*300,size:4+Math.random()*3,colour:colours[index%colours.length]});
  ensureVoxelAnimation();
}
function drawVoxelChoicePreviews(){
  gardenCatalogue.querySelectorAll('.voxel-choice').forEach(button=>{
    const canvas=button.querySelector('canvas'),context=canvas.getContext('2d'),id=button.dataset.voxelChoice,kind=button.dataset.choiceKind;
    context.clearRect(0,0,canvas.width,canvas.height);const metrics={tileW:92,tileH:42,blockH:13};
    const cell={x:4,y:4,terrain:kind==='build'?id:'grass'};drawVoxelTerrain(context,cell,84,98,metrics);
    if(kind==='plant')drawVoxelCrop(context,84,102,{kind:id,stage:5},1.3);
    if(kind==='decorate')drawVoxelDecoration(context,84,102,id,1.15);
  });
}
function selectVoxelAction(action){
  const availability=voxelActionAvailability();if(!availability[action]){showToast('Choose another block for that action.');return}
  const cell=selectedVoxel();
  if(['plant','change','build','decorate'].includes(action)){playGardenEffect('tap');voxelChoiceMode=action;renderGardenBuilder();gardenChoiceTitle.scrollIntoView({behavior:reducedVoxelMotion.matches?'auto':'smooth',block:'nearest'});return}
  if(action==='water'){
    snapshotVoxelUndo();cell.crop.stage=Math.min(5,cell.crop.stage+1);cell.crop.waterCount=(cell.crop.waterCount||0)+1;emitVoxelParticles('water');completeVoxelAction(`Watered gently · ${GROWTH_STAGES[cell.crop.stage]}`,'Water sparkles helped the plant grow.','water');return;
  }
  if(action==='harvest'){
    snapshotVoxelUndo();const plant=voxelPlants[cell.crop.kind],kind=cell.crop.kind;voxelWorldFor().inventory[kind]=(voxelWorldFor().inventory[kind]||0)+plant.yield;voxelWorldFor().harvestCount+=plant.yield;cell.crop=null;emitVoxelParticles('harvest');cell.itemPosition=null;completeVoxelAction(`${plant.name} harvested · Hauhake!`,`+${plant.yield} ${plant.name} added to your collection.`,'harvest');return;
  }
  if(action==='remove'){
    snapshotVoxelUndo();let refund=0,label='Garden item';
    if(cell.crop){const plant=voxelPlants[cell.crop.kind];refund=cell.crop.paidPrice||0;label=plant.name;cell.crop=null;cell.itemPosition=null}
    else if(cell.decoration){const item=voxelDecorations.find(entry=>entry.id===cell.decoration);refund=cell.paidDecorationPrice||0;label=item?.name||label;cell.decoration=null;cell.itemPosition=null;cell.itemRotation=0;cell.chairRotationManual=false;cell.paidDecorationPrice=0}
    else if(cell.terrain!=='grass'){refund=cell.paidTerrainPrice||0;label=terrainNames[cell.terrain].split(' · ')[0];cell.terrain='grass';cell.terrainPosition=null;cell.zone=null;cell.paidTerrainPrice=0}
    setWallet(walletFor()+refund);completeVoxelAction(`${label} removed · ${refund} token${refund===1?'':'s'} returned.`,'Garden plot cleared gently.','remove');
  }
}
function gardenItemFor(kind,id){return kind==='plant'?voxelPlants[id]:kind==='build'?voxelBuildChoices.find(entry=>entry.id===id):voxelDecorations.find(entry=>entry.id===id)}
function nearestGardenPlacement(choice,origin=selectedVoxelCell){
  return voxelWorldFor().cells.filter(cell=>canPlaceGardenChoice(choice,cell)&&!(gardenEditor.mode==='move'&&cell.x===gardenEditor.source?.x&&cell.y===gardenEditor.source?.y)).sort((a,b)=>(Math.abs(a.x-origin.x)+Math.abs(a.y-origin.y))-(Math.abs(b.x-origin.x)+Math.abs(b.y-origin.y)))[0]||null;
}
function gardenPreviewStagingPoint(choice){
  const candidates=[[.84,.54],[.16,.54],[.84,.72],[.16,.72]].map(([x,y])=>({x:voxelMetrics.width*x,y:voxelMetrics.height*y}));
  return candidates.find(point=>gardenPointInsidePlacementArea(point)&&gardenTargetCellForPoint(point,choice))||null;
}
function openGardenDrawer(showCollection=false){
  Object.assign(gardenEditor,{mode:'idle',choice:null,source:null,collection:showCollection,previewPosition:null,previewRotation:0,target:null,previewValid:false,dragPointerId:null,dragOffset:null});gardenDrawer.hidden=false;addToGarden.setAttribute('aria-expanded','true');gardenObjectMenu.hidden=true;renderGardenBuilder();
  (showCollection?closeGardenDrawer:gardenCategories.querySelector('.active'))?.focus({preventScroll:true});playGardenEffect('tap');
}
function closeGardenChoices(){gardenDrawer.hidden=true;gardenEditor.collection=false;addToGarden.setAttribute('aria-expanded','false');renderGardenBuilder();addToGarden.focus({preventScroll:true})}
function beginGardenPreview(kind,id){
  const item=gardenItemFor(kind,id);if(!item||walletFor()<item.price){showToast('Complete more movement to earn Garden Tokens.');return}
  const choice={kind,id,item};Object.assign(gardenEditor,{mode:'preview',choice,source:null,collection:false,previewPosition:null,previewRotation:0,target:null,previewValid:false,hasDragged:false,dragPointerId:null,dragOffset:null});
  const target=nearestGardenPlacement(choice);if(!target){showToast('There is no clear place for that item yet. Try moving or removing something.');return}
  const stagingPoint=gardenPreviewStagingPoint(choice)||voxelCellCentre(target.x,target.y);selectedVoxelCell={x:target.x,y:target.y};updateGardenPreviewPoint(stagingPoint);gardenDrawer.hidden=true;addToGarden.setAttribute('aria-expanded','false');playGardenEffect('tap');renderGardenBuilder();gardenCanvas.focus({preventScroll:true});
}
function cancelGardenPlacement(){Object.assign(gardenEditor,{mode:'idle',choice:null,source:null,previewPosition:null,previewRotation:0,target:null,previewValid:false,dragPointerId:null,dragOffset:null});renderGardenBuilder();playGardenEffect('tap');addToGarden.focus({preventScroll:true})}
function placeCurrentGardenChoice(){
  const cell=gardenEditor.target,choice=gardenEditor.choice,exactPosition=gardenEditor.previewPosition?{...gardenEditor.previewPosition}:null;
  if(!gardenEditor.hasDragged){showToast('Grab the item and drag it to the place you choose first.');return}
  if(!gardenEditor.previewValid||!exactPosition||!canPlaceGardenChoice(choice,cell)){showToast('That position is not available. Drag the item to a clear place.');return}
  snapshotVoxelUndo();
  if(gardenEditor.mode==='move'){
    const source=voxelWorldFor().cells.find(entry=>entry.x===gardenEditor.source.x&&entry.y===gardenEditor.source.y);
    if(!source){cancelGardenPlacement();return}
    const sameCell=source===cell;
    if(source.crop){
      if(!sameCell){if(cell.terrain==='grass'){cell.terrain='soil';cell.terrainPosition={...exactPosition}}cell.crop=source.crop;source.crop=null;source.itemPosition=null}
      cell.itemPosition={...exactPosition};
    }else if(source.decoration){
      const rotation=normaliseChairRotation(source.itemRotation),manualRotation=Boolean(source.chairRotationManual),decoration=source.decoration;
      if(!sameCell){cell.decoration=decoration;cell.paidDecorationPrice=source.paidDecorationPrice||0;source.decoration=null;source.paidDecorationPrice=0;source.itemPosition=null;source.itemRotation=0;source.chairRotationManual=false}
      cell.itemPosition={...exactPosition};cell.itemRotation=rotation;cell.chairRotationManual=manualRotation;if(decoration==='bench'&&!manualRotation)arrangeNearbyGardenChairs(cell,exactPosition);
    }else{
      if(!sameCell){cell.terrain=source.terrain;cell.paidTerrainPrice=source.paidTerrainPrice||0;cell.zone=source.zone;source.terrain='grass';source.paidTerrainPrice=0;source.zone=null;source.terrainPosition=null}
      cell.terrainPosition={...exactPosition};
    }
    gardenAppearances.push({x:cell.x,y:cell.y,started:performance.now(),kind:'move'});completeVoxelAction('Moved gently to its new place.','Your garden item is now in its new home.','build');return;
  }
  const {kind,id,item}=choice;let socialChair=false;setWallet(walletFor()-item.price);
  if(kind==='plant'){if(cell.terrain==='grass'){cell.terrain='soil';cell.terrainPosition={...exactPosition}}cell.crop={kind:id,stage:2,waterCount:0,paidPrice:item.price};cell.decoration=null;cell.itemPosition={...exactPosition};cell.itemRotation=0;cell.chairRotationManual=false}
  else if(kind==='build'){cell.terrain=id;cell.terrainPosition={...exactPosition};cell.paidTerrainPrice=item.price;cell.crop=null;cell.itemPosition=null;cell.decoration=null;cell.itemRotation=0;cell.chairRotationManual=false;cell.paidDecorationPrice=0;cell.zone=id==='raised'&&state.builderMode==='cooperation'?'shared-central':null}
  else{cell.decoration=id;cell.paidDecorationPrice=item.price;cell.itemPosition={...exactPosition};cell.itemRotation=id==='bench'?normaliseChairRotation(gardenEditor.previewRotation):0;cell.chairRotationManual=false;if(id==='bench')socialChair=arrangeNearbyGardenChairs(cell,exactPosition)}
  gardenAppearances.push({x:cell.x,y:cell.y,started:performance.now(),kind});emitVoxelParticles(kind==='plant'?'plant':'settle');completeVoxelAction(`${item.name} is now in your garden.`,socialChair?'The two chairs are gently angled toward each other. Tap either chair and press Rotate to adjust it.':kind==='plant'?`The soil settles softly around your ${item.name}.`:`Your ${item.name} now belongs in this garden.`,kind==='plant'?'plant':kind);
}
function applyVoxelChoice(kind,id){beginGardenPreview(kind,id)}
voxelActionBar.addEventListener('click',event=>{const button=event.target.closest('[data-garden-action]');if(button&&!button.disabled)selectVoxelAction(button.dataset.gardenAction)});
easyGardenAction.addEventListener('click',()=>{
  const action=easyGardenAction.dataset.easyAction;
  if(action==='prepare'){prepareSelectedSoil();return}
  if(action==='find'){chooseNextHelpfulCell();return}
  selectVoxelAction(action);
});
gardenSurprise.addEventListener('click',growGardenSurprise);
moreGardenChoices.addEventListener('click',()=>{
  playGardenEffect('tap');
  const expanded=moreGardenChoices.getAttribute('aria-expanded')==='true';
  moreGardenChoices.setAttribute('aria-expanded',String(!expanded));voxelActionBar.hidden=expanded;
  moreGardenChoices.textContent=expanded?'＋ More garden choices · Ētahi atu kōwhiringa':'− Hide extra choices · Huna ngā kōwhiringa';
});
gardenCatalogue.addEventListener('click',event=>{const choice=event.target.closest('[data-voxel-choice]');if(choice&&!choice.disabled)applyVoxelChoice(choice.dataset.choiceKind,choice.dataset.voxelChoice)});
addToGarden.addEventListener('click',()=>openGardenDrawer(false));
openGardenCollection.addEventListener('click',()=>openGardenDrawer(true));
closeGardenDrawer.addEventListener('click',closeGardenChoices);
gardenCategories.addEventListener('click',event=>{
  const button=event.target.closest('[data-garden-category]');if(!button)return;
  gardenEditor.category=button.dataset.gardenCategory;gardenEditor.collection=false;gardenCategories.querySelectorAll('button').forEach(entry=>entry.classList.toggle('active',entry===button));playGardenEffect('tap');renderGardenBuilder();
});
placeGardenChoice.addEventListener('click',placeCurrentGardenChoice);
cancelGardenChoice.addEventListener('click',cancelGardenPlacement);
moveGardenObject.addEventListener('click',()=>{
  const cell=selectedVoxel();if(!gardenCellOccupied(cell))return;
  let kind,id,item;if(cell.crop){kind='plant';id=cell.crop.kind;item=voxelPlants[id]}else if(cell.decoration){kind='decorate';id=cell.decoration;item=voxelDecorations.find(entry=>entry.id===id)}else{kind='build';id=cell.terrain;item=voxelBuildChoices.find(entry=>entry.id===id)}
  const centre=kind==='build'?gardenTerrainCentre(cell):gardenItemCentre(cell);
  Object.assign(gardenEditor,{mode:'move',choice:{kind,id,item},source:{x:cell.x,y:cell.y},previewPosition:null,previewRotation:normaliseChairRotation(cell.itemRotation),target:cell,previewValid:true,hasDragged:false,dragPointerId:null,dragOffset:null});updateGardenPreviewPoint(centre);playGardenEffect('tap');renderGardenBuilder();gardenCanvas.focus({preventScroll:true});
});
rotateGardenObject.addEventListener('click',()=>{
  const cell=selectedVoxel();if(cell?.decoration!=='bench')return;
  snapshotVoxelUndo();cell.itemRotation=normaliseChairRotation((cell.itemRotation||0)+45);cell.chairRotationManual=true;savePrototypeData();playGardenEffect('tap');navigator.vibrate?.(8);renderGardenBuilder();showToast('Chair turned one 45° step. Press Rotate again for another direction.');
});
removeGardenObject.addEventListener('click',()=>selectVoxelAction('remove'));
gardenObjectInfo.addEventListener('click',()=>{const [heading,detail]=describeVoxelCell();showToast(`${heading}. ${detail}.`);playGardenEffect('tap')});
function updateGardenView(zoomDelta=0,panDelta=0,reset=false){
  if(reset){gardenCamera.zoom=1;gardenCamera.panX=0}else{gardenCamera.zoom=Math.max(1,Math.min(1.32,gardenCamera.zoom+zoomDelta));gardenCamera.panX=Math.max(-1,Math.min(1,gardenCamera.panX+panDelta))}
  playGardenEffect('tap');renderVoxelGarden(performance.now());
}
gardenViewLeft.addEventListener('click',()=>updateGardenView(0,-.24));gardenViewRight.addEventListener('click',()=>updateGardenView(0,.24));
gardenZoomOut.addEventListener('click',()=>updateGardenView(-.08,0));gardenZoomIn.addEventListener('click',()=>updateGardenView(.08,0));gardenViewReset.addEventListener('click',()=>updateGardenView(0,0,true));
gardenCanvas.addEventListener('pointerdown',event=>{
  if(event.target.closest('button'))return;
  if(event.button!==undefined&&event.button!==0)return;
  if(['preview','move'].includes(gardenEditor.mode)){
    const point=pointerToGardenPoint(event.clientX,event.clientY),centre=gardenPreviewPoint();if(!gardenPreviewHitTest(point)||!centre)return;
    gardenEditor.dragPointerId=event.pointerId;gardenEditor.dragOffset={x:point.x-centre.x,y:point.y-centre.y};voxelGardenCanvas.setPointerCapture?.(event.pointerId);playGardenEffect('tap');navigator.vibrate?.(6);event.preventDefault();return;
  }
  const cell=voxelCellFromPointer(event.clientX,event.clientY);if(!cell)return;
  selectedVoxelCell={x:cell.x,y:cell.y};voxelChoiceMode=null;
  gardenEditor.mode=gardenCellOccupied(cell)?'selected':'idle';
  playGardenEffect('tap');renderGardenBuilder();navigator.vibrate?.(6);event.preventDefault();
});
gardenCanvas.addEventListener('pointermove',event=>{
  if(gardenEditor.dragPointerId!==event.pointerId||!gardenEditor.dragOffset)return;
  const point=pointerToGardenPoint(event.clientX,event.clientY),current=gardenPreviewPoint(),next={x:point.x-gardenEditor.dragOffset.x,y:point.y-gardenEditor.dragOffset.y};if(!current||Math.hypot(next.x-current.x,next.y-current.y)>.5)gardenEditor.hasDragged=true;updateGardenPreviewPoint(next);renderVoxelSelection();renderVoxelGarden(performance.now());event.preventDefault();
});
function finishGardenDrag(event){
  if(gardenEditor.dragPointerId!==event.pointerId)return;
  gardenEditor.dragPointerId=null;gardenEditor.dragOffset=null;if(voxelGardenCanvas.hasPointerCapture?.(event.pointerId))voxelGardenCanvas.releasePointerCapture(event.pointerId);renderGardenBuilder();event.preventDefault();
}
gardenCanvas.addEventListener('pointerup',finishGardenDrag);gardenCanvas.addEventListener('pointercancel',finishGardenDrag);
gardenCanvas.addEventListener('keydown',event=>{
  const moves={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};
  if(moves[event.key]){event.preventDefault();if(['preview','move'].includes(gardenEditor.mode)){const current=gardenPreviewPoint()||voxelCellCentre(selectedVoxelCell.x,selectedVoxelCell.y),stepX=voxelMetrics.width*.018,stepY=voxelMetrics.height*.018;gardenEditor.hasDragged=true;updateGardenPreviewPoint({x:current.x+moves[event.key][0]*stepX,y:current.y+moves[event.key][1]*stepY})}else{selectedVoxelCell={x:Math.max(0,Math.min(VOXEL_COLS-1,selectedVoxelCell.x+moves[event.key][0])),y:Math.max(0,Math.min(VOXEL_ROWS-1,selectedVoxelCell.y+moves[event.key][1]))}}voxelChoiceMode=null;renderGardenBuilder();return}
  if(['Enter',' '].includes(event.key)){event.preventDefault();if(['preview','move'].includes(gardenEditor.mode))placeCurrentGardenChoice();else if(gardenEditor.mode==='idle')openGardenDrawer(false)}
  if(event.key==='Escape'){voxelChoiceMode=null;gardenDrawer.hidden=true;Object.assign(gardenEditor,{mode:'idle',choice:null,source:null,collection:false,previewPosition:null,target:null,previewValid:false,dragPointerId:null,dragOffset:null});renderGardenBuilder()}
});
gardenSound.addEventListener('click',()=>{gardenSoundEnabled=!gardenSoundEnabled;localStorage.setItem('sharedGardenSounds',gardenSoundEnabled?'on':'off');renderGardenBuilder();if(gardenSoundEnabled)playGardenEffect('success')});
undoGarden.addEventListener('click',()=>{
  let entry;while(voxelUndoStack.length&&!entry){const candidate=voxelUndoStack.pop();if(candidate.mode===state.builderMode)entry=candidate}
  if(!entry){renderGardenBuilder();return}prototypeData.voxelGardens[entry.mode]=entry.world;setWallet(entry.wallet,entry.mode);prototypeData.turn=entry.turn;voxelChoiceMode=null;Object.assign(gardenEditor,{mode:'idle',choice:null,source:null,previewPosition:null,target:null,previewValid:false,dragPointerId:null,dragOffset:null});savePrototypeData();playGardenEffect('remove');renderGardenBuilder();showToast('Last garden action undone · Kua hoki whakamuri.');
});
if('ResizeObserver'in window)new ResizeObserver(()=>{if(state.screen==='builder'){renderVoxelGarden(performance.now());ensureVoxelAnimation()}}).observe(gardenCanvas);
else window.addEventListener('resize',()=>state.screen==='builder'&&renderVoxelGarden(performance.now()));

function showSavedGardenReward(){
  rewardNext='home';document.querySelector('.token-award').hidden=true;
  if(state.builderMode==='cooperation'){rewardTitle.textContent='We grew this together.';rewardMessage.textContent='Our shared garden is flourishing.'}
  else{rewardTitle.textContent='Your garden is saved.';rewardMessage.textContent='Come back after another movement session to keep growing.'}
  savePlantLater.hidden=true;openRewardGarden.querySelector('span').textContent='Return Home';showScreen('reward');
}
document.querySelector('#finishGarden').addEventListener('click',()=>{
  savePrototypeData();
  if(state.builderMode==='competition')showChallengeResults();else showSavedGardenReward();
});
openRewardGarden.addEventListener('click',()=>{if(rewardNext==='home'){showScreen('home');return}openGardenAfterReward=true;openBuilder(state.gameMode)});
savePlantLater.addEventListener('click',()=>{openGardenAfterReward=false;showScreen('home');showToast('Saved for later. Your Garden Tokens are ready when you return.')});

function showChallengeResults(){
  const score=competitionScore(true),world=voxelWorldFor('competition'),cropCount=world.cells.filter(cell=>cell.crop).length,featureCount=world.cells.filter(cell=>cell.decoration||!['grass','soil'].includes(cell.terrain)).length;
  const voxelPreview=(blocks,crops,label)=>`<div class="voxel-result-mini" aria-label="${label}"><span class="mini-voxel-stack" aria-hidden="true">${'<i></i>'.repeat(Math.min(8,Math.max(3,blocks)))}</span><b>${crops} crops · ${blocks} garden features</b></div>`;
  const gardenPreview=voxelPreview(featureCount,cropCount,'Your original voxel challenge garden');
  document.querySelector('#finalBreakdown').innerHTML=`<div><b>${score.movement}/40</b><span>Movement</span></div><div><b>${score.theme}/30</b><span>Māra theme</span></div><div><b>${score.variety}/20</b><span>Variety</span></div><div><b>${score.submit}/10</b><span>Submitted</span></div><strong>${score.total}/100 total</strong>`;
  const participants=[
    {name:'Aroha’s Garden',garden:gardenPreview,award:'Most Creative Garden'},
    {name:'Rimu Team',garden:voxelPreview(7,5,'Rimu Team home garden'),award:'Golden Garden Celebration'},
    {name:'Kauri Team',garden:voxelPreview(6,6,'Kauri Team home garden'),award:'Most Colourful Garden'}
  ];
  document.querySelector('#awardGrid').innerHTML=participants.map(person=>`<article><div class="result-garden">${person.garden}</div><b>${person.award}</b><small>${person.name}</small></article>`).join('');
  const voteGrid=document.querySelector('#voteGrid');
  voteGrid.innerHTML=participants.map(person=>`<button data-vote="${person.name}" ${prototypeData.userVote?'disabled':''}><div class="result-garden">${person.garden}</div><b>${person.name}</b><small>${prototypeData.votes[person.name]||0} celebration votes</small><i>${prototypeData.userVote===person.name?'✓ Vote recorded':prototypeData.userVote?'Voting complete':'Celebrate this garden'}</i></button>`).join('');
  showScreen('results');
}
document.querySelector('#voteGrid').addEventListener('click',event=>{
  const button=event.target.closest('[data-vote]');if(!button||prototypeData.userVote)return;
  prototypeData.userVote=button.dataset.vote;prototypeData.votes[button.dataset.vote]=(prototypeData.votes[button.dataset.vote]||0)+1;savePrototypeData();showChallengeResults();showToast('Your People’s Choice vote was saved.');
});

window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;installButton.hidden=false});
installButton.addEventListener('click',async()=>{if(!installPrompt)return;installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;installButton.hidden=true});
if('serviceWorker'in navigator&&location.protocol!=='file:')navigator.serviceWorker.register('./service-worker.js?v=57');
applyMovementMode();applyMirrorMode();setCoachPhase('ready');renderStep(-1);renderAlbum();showScreen('home',false);
document.querySelector('.track.selected')?.click();
loadBundledCoachVideo().catch(()=>{trackHint.textContent='Coach video could not load. Refresh the page to try again.'});
window.addEventListener('pagehide',()=>{if(defaultCoachObjectUrl)URL.revokeObjectURL(defaultCoachObjectUrl)},{once:true});
app.dataset.ready='true';
