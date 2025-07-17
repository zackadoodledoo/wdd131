// Child page date night planner with parent communication
class ChildDateNightPlanner {
    constructor() {
        this.preferences = {
            location: '',
            family: '',
            activity: '',
            budget: '',
            dietary: '',
            cuisines: []
        };
        this.activities = [
            {
                name: "Cozy Movie Marathon",
                type: "stay-in",
                activityType: "relaxed",
                isFamilyFriendly: true,
                description: "Create a blanket fort and binge-watch your favorite series with homemade popcorn and hot chocolate.",
                dinnerPairing: "Homemade pizza with customizable toppings",
                location: "Living room",
                tags: ["cozy", "relaxed", "indoor"]
            },
            {
                name: "Wine & Paint Night",
                type: "stay-in",
                activityType: "creative",
                isFamilyFriendly: false,
                description: "Set up easels, open a bottle of wine, and create masterpieces together while enjoying intimate conversation.",
                dinnerPairing: "Cheese and charcuterie board with wine pairings",
                location: "Home studio",
                tags: ["creative", "romantic", "artistic"]
            },
            {
                name: "Hiking Adventure",
                type: "go-out",
                activityType: "active",
                isFamilyFriendly: true,
                description: "Explore scenic trails, enjoy nature, and have a picnic at a beautiful viewpoint.",
                dinnerPairing: "Packed gourmet sandwiches and fresh fruit",
                location: "Nature trail",
                tags: ["active", "outdoor", "adventurous"]
            },
            {
                name: "Cooking Class",
                type: "go-out",
                activityType: "creative",
                isFamilyFriendly: true,
                description: "Learn to make a new cuisine together in a hands-on cooking class led by professional chefs.",
                dinnerPairing: "The meal you create in class",
                location: "Culinary school",
                tags: ["creative", "learning", "culinary"]
            },
            {
                name: "Stargazing Picnic",
                type: "go-out",
                activityType: "relaxed",
                isFamilyFriendly: true,
                description: "Drive to a dark sky location with blankets and telescopes for romantic stargazing.",
                dinnerPairing: "Elegant picnic basket with wine and finger foods",
                location: "Dark sky area",
                tags: ["romantic", "outdoor", "peaceful"]
            },
            {
                name: "Game Night Tournament",
                type: "stay-in",
                activityType: "relaxed",
                isFamilyFriendly: true,
                description: "Compete in various board games and video games with fun prizes for the winner.",
                dinnerPairing: "Takeout from your favorite restaurant",
                location: "Game room",
                tags: ["competitive", "fun", "casual"]
            },
            {
                name: "Dance Class",
                type: "go-out",
                activityType: "active",
                isFamilyFriendly: false,
                description: "Learn salsa, swing, or ballroom dancing together in a beginner-friendly class.",
                dinnerPairing: "Dinner at a romantic restaurant with live music",
                location: "Dance studio",
                tags: ["active", "romantic", "learning"]
            },
            {
                name: "Mini Golf & Arcade",
                type: "go-out",
                activityType: "active",
                isFamilyFriendly: true,
                description: "Enjoy friendly competition at mini golf followed by classic arcade games.",
                dinnerPairing: "Casual dining at a sports bar or family restaurant",
                location: "Entertainment center",
                tags: ["fun", "competitive", "casual"]
            },
            {
                name: "Spa Night at Home",
                type: "stay-in",
                activityType: "relaxed",
                isFamilyFriendly: false,
                description: "Create a relaxing spa atmosphere with face masks, massages, and aromatherapy.",
                dinnerPairing: "Light, healthy meal with herbal teas",
                location: "Bedroom/bathroom",
                tags: ["relaxing", "intimate", "wellness"]
            },
            {
                name: "Escape Room Challenge",
                type: "go-out",
                activityType: "adventurous",
                isFamilyFriendly: true,
                description: "Work together to solve puzzles and escape themed rooms within the time limit.",
                dinnerPairing: "Celebratory dinner at a themed restaurant",
                location: "Escape room facility",
                tags: ["challenging", "teamwork", "thrilling"]
            },
            {
                name: "Farmers Market & Cooking",
                type: "go-out",
                activityType: "creative",
                isFamilyFriendly: true,
                description: "Browse local farmers market together, then cook a meal using fresh ingredients.",
                dinnerPairing: "Farm-to-table meal you prepare together",
                location: "Farmers market + home",
                tags: ["creative", "local", "healthy"]
            },
            {
                name: "Concert or Live Show",
                type: "go-out",
                activityType: "adventurous",
                isFamilyFriendly: false,
                description: "Enjoy live music, comedy, or theater performances for a cultural evening out.",
                dinnerPairing: "Pre-show dinner at an upscale restaurant",
                location: "Concert hall/theater",
                tags: ["cultural", "entertainment", "memorable"]
            }
        ];
        this.initializeEventListeners();
        this.setupParentCommunication();
        this.sendMessageToParent('Child page loaded successfully');
    }

    // Communication with parent window
    sendMessageToParent(message) {
        if (window.parent && window.parent !== window) {
            window.parent.postMessage({
                type: 'dateNightPlanner',
                data: message,
                timestamp: new Date().toISOString()
            }, '*');
        }
    }

    // Listen for messages from parent
    setupParentCommunication() {
        window.addEventListener('message', (event) => {
            if (event.data.type === 'parentCommand') {
                this.handleParentCommand(event.data.command);
            }
        });
    }

    handleParentCommand(command) {
        switch(command) {
            case 'reset':
                this.resetForm();
                break;
            case 'getPreferences':
                this.sendMessageToParent(`Current preferences: ${JSON.stringify(this.preferences)}`);
                break;
            case 'generateRandom':
                this.generateRandomDate();
                break;
        }
    }

    initializeEventListeners() {
        // Handle preference button clicks
        document.querySelectorAll('.btn[data-preference]').forEach(btn => {
            btn.addEventListener('click', (e) => this.handlePreferenceClick(e));
        });

        // Handle form input changes
        const budgetEl = document.getElementById('budget');
        if (budgetEl) {
            budgetEl.addEventListener('change', (e) => {
                this.preferences.budget = e.target.value;
                this.sendMessageToParent(`Budget updated to: ${e.target.value}`);
            });
        }

        const dietaryEl = document.getElementById('dietary');
        if (dietaryEl) {
            dietaryEl.addEventListener('input', (e) => {
                this.preferences.dietary = e.target.value;
                this.sendMessageToParent(`Dietary preferences updated: ${e.target.value}`);
            });
        }

        // Handle cuisine checkbox changes
        document.querySelectorAll('input[name="cuisine"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.preferences.cuisines.push(e.target.value);
                } else {
                    this.preferences.cuisines = this.preferences.cuisines.filter(c => c !== e.target.value);
                }
                this.sendMessageToParent(`Cuisines updated: ${this.preferences.cuisines.join(', ')}`);
            });
        });

        // Handle generate plan button
        const generateBtn = document.getElementById('generatePlan');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generateDatePlan());
        }

        // Handle surprise me button
        const surpriseBtn = document.getElementById('surpriseMe');
        if (surpriseBtn) {
            surpriseBtn.addEventListener('click', () => this.generateRandomDate());
        }
    }

    handlePreferenceClick(event) {
        const btn = event.target;
        const preference = btn.dataset.preference;
        const value = btn.dataset.value;
        
        // Remove active class from siblings
        btn.parentElement.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Update preferences
        this.preferences[preference] = value;
        
        // Send update to parent
        this.sendMessageToParent(`${preference} preference updated to: ${value}`);
    }

    generateDatePlan() {
        const filteredActivities = this.filterActivities();
        
        if (filteredActivities.length === 0) {
            this.displayError('No activities match your preferences. Please try adjusting your selections.');
            return;
        }
        
        const selectedActivity = this.selectRandomActivity(filteredActivities);
        const restaurantSuggestions = this.getRestaurantSuggestions();
        
        const plan = {
            activity: selectedActivity,
            restaurants: restaurantSuggestions,
            preferences: this.preferences
        };
        
        this.displayPlan(plan);
        this.sendMessageToParent(`Generated date plan: ${selectedActivity.name}`);
    }

    filterActivities() {
        return this.activities.filter(activity => {
            // Filter by location preference
            if (this.preferences.location && activity.type !== this.preferences.location) {
                return false;
            }
            
            // Filter by family-friendly preference
            if (this.preferences.family === 'yes' && !activity.isFamilyFriendly) {
                return false;
            }
            
            // Filter by activity type
            if (this.preferences.activity && activity.activityType !== this.preferences.activity) {
                return false;
            }
            
            return true;
        });
    }

    selectRandomActivity(activities) {
        const randomIndex = Math.floor(Math.random() * activities.length);
        return activities[randomIndex];
    }

    getRestaurantSuggestions() {
        const cuisines = this.preferences.cuisines.length > 0 ? this.preferences.cuisines : ['Italian', 'American', 'Asian'];
        const budget = this.preferences.budget || 'moderate';
        
        return cuisines.slice(0, 3).map(cuisine => ({
            name: `${cuisine} Restaurant`,
            cuisine: cuisine,
            budget: budget,
            rating: (Math.random() * 1.5 + 3.5).toFixed(1)
        }));
    }

    generateRandomDate() {
        // Randomly select preferences
        const locations = ['stay-in', 'go-out'];
        const activities = ['relaxed', 'active', 'creative', 'adventurous'];
        const families = ['yes', 'no'];
        const budgets = ['budget', 'moderate', 'splurge'];
        
        this.preferences = {
            location: locations[Math.floor(Math.random() * locations.length)],
            family: families[Math.floor(Math.random() * families.length)],
            activity: activities[Math.floor(Math.random() * activities.length)],
            budget: budgets[Math.floor(Math.random() * budgets.length)],
            dietary: '',
            cuisines: ['Italian', 'Mexican', 'Thai'].slice(0, Math.floor(Math.random() * 3) + 1)
        };
        
        this.updateUIWithPreferences();
        this.generateDatePlan();
        this.sendMessageToParent('Generated random date preferences and plan');
    }

    updateUIWithPreferences() {
        // Update buttons to reflect current preferences
        Object.keys(this.preferences).forEach(key => {
            const value = this.preferences[key];
            if (value && key !== 'dietary' && key !== 'cuisines') {
                const btn = document.querySelector(`[data-preference="${key}"][data-value="${value}"]`);
                if (btn) {
                    btn.parentElement.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                }
            }
        });
        
        // Update form inputs
        const budgetEl = document.getElementById('budget');
        if (budgetEl) budgetEl.value = this.preferences.budget;
        
        const dietaryEl = document.getElementById('dietary');
        if (dietaryEl) dietaryEl.value = this.preferences.dietary;
        
        // Update cuisine checkboxes
        document.querySelectorAll('input[name="cuisine"]').forEach(checkbox => {
            checkbox.checked = this.preferences.cuisines.includes(checkbox.value);
        });
    }

    displayPlan(plan) {
        const resultsDiv = document.getElementById('results');
        if (!resultsDiv) return;
        
        const html = `
            <div class="date-plan">
                <h2>🎉 Your Perfect Date Night Plan!</h2>
                
                <div class="activity-card">
                    <h3>${plan.activity.name}</h3>
                    <p class="activity-type">${plan.activity.type === 'stay-in' ? '🏠 Stay In' : '🌟 Go Out'} • ${plan.activity.activityType}</p>
                    <p class="description">${plan.activity.description}</p>
                    <p class="location"><strong>Location:</strong> ${plan.activity.location}</p>
                    <p class="dinner-pairing"><strong>Dinner Suggestion:</strong> ${plan.activity.dinnerPairing}</p>
                    <div class="tags">
                        ${plan.activity.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                
                <div class="restaurant-suggestions">
                    <h3>🍽️ Restaurant Recommendations</h3>
                    ${plan.restaurants.map(restaurant => `
                        <div class="restaurant-card">
                            <h4>${restaurant.name}</h4>
                            <p>Cuisine: ${restaurant.cuisine} • Budget: ${restaurant.budget} • Rating: ${restaurant.rating}★</p>
                        </div>
                    `).join('')}
                </div>
                
                <div class="preferences-summary">
                    <h3>📝 Your Preferences</h3>
                    <ul>
                        <li><strong>Location:</strong> ${plan.preferences.location || 'Any'}</li>
                        <li><strong>Family-friendly:</strong> ${plan.preferences.family || 'Any'}</li>
                        <li><strong>Activity type:</strong> ${plan.preferences.activity || 'Any'}</li>
                        <li><strong>Budget:</strong> ${plan.preferences.budget || 'Any'}</li>
                        ${plan.preferences.dietary ? `<li><strong>Dietary needs:</strong> ${plan.preferences.dietary}</li>` : ''}
                        ${plan.preferences.cuisines.length > 0 ? `<li><strong>Preferred cuisines:</strong> ${plan.preferences.cuisines.join(', ')}</li>` : ''}
                    </ul>
                </div>
                
                <div class="action-buttons">
                    <button class="btn btn-secondary" onclick="planner.generateDatePlan()">🎲 Generate Another</button>
                    <button class="btn btn-primary" onclick="planner.savePlan()">💾 Save This Plan</button>
                </div>
            </div>
        `;
        
        resultsDiv.innerHTML = html;
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }

    displayError(message) {
        const resultsDiv = document.getElementById('results');
        if (!resultsDiv) return;
        
        resultsDiv.innerHTML = `
            <div class="error-message">
                <h3>⚠️ Oops!</h3>
                <p>${message}</p>
                <button class="btn btn-primary" onclick="planner.resetForm()">🔄 Reset Preferences</button>
            </div>
        `;
    }

    savePlan() {
        const planData = {
            preferences: this.preferences,
            timestamp: new Date().toISOString()
        };
        
        // In a real app, you would save this to a database or local storage
        console.log('Saving plan:', planData);
        this.sendMessageToParent(`Plan saved: ${JSON.stringify(planData)}`);
        
        // Show confirmation
        const confirmation = document.createElement('div');
        confirmation.className = 'save-confirmation';
        confirmation.innerHTML = '✅ Plan saved successfully!';
        confirmation.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(confirmation);
        
        setTimeout(() => {
            confirmation.remove();
        }, 3000);
    }

    resetForm() {
        // Reset preferences
        this.preferences = {
            location: '',
            family: '',
            activity: '',
            budget: '',
            dietary: '',
            cuisines: []
        };
        
        // Reset UI
        document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        
        const budgetEl = document.getElementById('budget');
        if (budgetEl) budgetEl.value = '';
        
        const dietaryEl = document.getElementById('dietary');
        if (dietaryEl) dietaryEl.value = '';
        
        const resultsDiv = document.getElementById('results');
        if (resultsDiv) resultsDiv.innerHTML = '';
        
        this.sendMessageToParent('Form reset to default state');
    }
}

// Initialize the planner when the page loads
let planner;
document.addEventListener('DOMContentLoaded', () => {
    planner = new ChildDateNightPlanner();
});

// Add some CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .date-plan {
        animation: fadeIn 0.5s ease-in;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .activity-card, .restaurant-card {
        transition: transform 0.2s ease;
    }
    
    .activity-card:hover, .restaurant-card:hover {
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);