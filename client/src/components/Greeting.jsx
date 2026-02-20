const GREETINGS = [
        'Welcome back, name. Your financial dashboard awaits.',
        'Glad you\'re here, name. Let\'s optimize your spending.',
        'Welcome back, name. Your numbers are ready.',
        'Great to have you here, name. Your insights are ready.',
        'Back again, name. Let\'s continue.',
        'Welcome back, name. Your spending insights are prepared.',
        'Good to see you, name. Let\'s review this period\'s performance.',
        'Back again, name. Let\'s keep things well managed.'
    ];

const generateGreeting = () => {
    const idx = Math.floor(Math.random() * 7);
    return GREETINGS[idx];
}

function Greeting ({name}) {

    const firstName = name.split(' ')[0];
    
    const greeting = generateGreeting().replace('name', firstName);

    return (
        <p className="text-black font-semibold text-3xl">{greeting}</p>
    )

}

export default Greeting;