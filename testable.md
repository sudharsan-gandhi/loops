# Testable items and flow
*Dated: 21 Feb 2022*

## User:
    * signup with email
    * signin with email or gmail. Facebook wont work because of ssl.
    * edit user once logged in. (Authentication required)
    * notes:
        - email should not be editable if not logged in with email authorization.
        - password field should not be visible if not logged in with emaill authorization.

## Packs:

    * Add pack (Authentication required)
    * Show pack in seperate page (Authentication not required):
    * notes:
        - If own pack show edit button.
        - If own pack show add audio button.
    * Edit pack (Authentication and should be owner)
    
    * Add audio to pack (Authentication required)
    * Edit audio in pack (Authentication and should be owner)
    * delete audio in pack (Authentication and should be owner)

    ~ Pending: Delete pack. ~

## Loops/Audio: (max file size updated to 100mb)
    * view Audio (Authentication not required)
    * Add single Audio (Authentication required)
    * Edit single Audio (Authentication and should be owner)
    * Delete Audio (Authentication and should be owner)

## Homepage (Authentication not required):

    Add more packs with atleast one audio to see content in the home page.

    * Will group and populate Packs based on genre.
    * Each groups are carousel sliders that can be scrolled horizontally.
    * Each pack on click will be taken to show pack details page.
    * After all genre group, 10 single audio loops will be displayed.

## Explore pack page
    * Should view packs
    * Click on Filter icon to filter the pack variables
    * can change number of packs visible per page
    * pagination (next and previous page arrow will come up when enough data is there)
    * sort the data in asc or desc based on selected field.

## Explore audio page
    * Should view mix of individual audio/loops and also from packs.
    * Click on Filter icon to filter the audio variables
    * can change number of audio visible per page
    * pagination (next and previous page arrow will come up when enough data is there)
    * sort the data in asc or desc based on selected field.
    * If the audio belongs to a pack 'Go to pack' button will be visible in filter window. (to navigate the pack)

## Payplans page
    * Will view cards of payplans

## jobs page
    * Will view the jobs available.
    * Filterable
    * pagination available
    * sorting available


    ** please note payplan page and jobs page cannot be tested right now since we cannot add data from ui. Admin page is underDevelopment **



# Bug fixes
    * Upload size of audio increased to 100mb - resolved
    * Edit and delete button not visible if the author owns the data. - resolved.