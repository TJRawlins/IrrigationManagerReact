# Droplet - Irrigation & Plant Management
Droplet is an irrigation and plant management system allowing users to create watering zones within specific seasons, then add plants to those zones. Users can discover how much water they are actually using throughout the week, month, and year.

## Stack, Frameworks, and Libraries:
Backend: C#, .NET, Entity Framework, Entity Framework Extensions (bulk actions), MS Server, T-SQL
Frontend: Typescript, React, Redux, Vite, Firebase, Material UI, Formik, Yup, Axios

## Backend Start Date: 
Sep 10, 2023
## Frontend Start Date: 
Nov 28, 2023

## Water Usage Tracker:
Water usage gets calculated as a total gallons per week, month, and year for each season, zone, and plant. This allows users to track their water usage for the entire season all the way down to individual plants.

## Zone Management:
Watering zones contain accumulative details such as total gallons, watering runtime (hours/mins), watering times per week, and total plants within the zone. Zones can be added to seasons, moved from one season to another, and duplicated along with it's plants. Zones can also be edited or deleted. When a zone is deleted, there is a confirmation prompt letting users know that all associated plants within the zone will also be deleted. Users can also upload an image for each zone. Firebase storage is used for hosting the images. If a user has an irrigation system, they are able to create these zone based on their current irrigation system's zones.

## Plant Management:
The plant page consist of a data grid containing a list of plants belonging to a particular season and zone. The data grid contains options such as column show/hide, filtering, density views, and export option for print or excel export. There is also an action column where users can view, edit or delete a plant. Plants can be individual or grouped in multiples as a type. They contain specific details about the plant such as plant type count, number of emitters per plant, emitter flow rate, sun exposure, USDA Zone and user notes about the plant, as well as, total gallons per week/month/year for that particular plant/plant type. Users can also upload an image for each plant. Firebase storage is used for image hosting.

## Future Enhancements:
- About Page: This will provide information about the application, including news, updates, documentation and contact information.
- Facebook / Google Authentication: Allow users to create accounts and login with their FB or Google credentials.
- Multi-factor / Two-step Authentication: Allow users to setup advanced authentication.
- Emitter Calculator: Allows users to auto-calculate the specific type of emitter (flow rate) and emitter count needed based on plant weekly gallons requirements and zone runtime
- Dashboard: Gives users an overview of season, zone, and plant data using graphs and charts. This will be customizable to users preference.
- General Settings: Gives users the ability to change things such as dark/light themes, regional systems ie. gallons vs liters, and language.
- Account Settings: Give users more control over account security and their profile.
- Multiple Users: Add ability to have multiple users per account and to set permissions
- Plant API: Access plant API's to retrieve planting and watering suggestions/tips, as well as more in-depth plant details
- AI: Implement AI to assist users by providing suggestions/tips when inputting plant information and viewing plant details based on pant type, season, and region. AI Plant identification.
- Notifications: Allow users to set reminders that can be sent via text or email. This can be used to set watering, fertilization, pruning/mowing, and fruit harvest reminders.
- Mobile Compatible: Create a more responsive UI, allowing for seamless user experience on mobile devices.
