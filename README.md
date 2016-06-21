# Project for PacificBioScience

You've been tasked with writing an app that will allow a scientist to input sample information associated with a 96-well PCR plate (see schematic here:http://www.cellsignet.com/media/plates/96.jpg). Write an AngularJS-based single page front-end web app which does the following:

1. Renders a blank schematic of the 96-well plate (outline and row/column headers)
2. Provides the following entry fields to associate information with a well on the plate:
    - Well Location (e.g. A1, B12, C4, H9, etc. - note that row names are A-H and column names are 1-12)
    - Reaction Time (in minutes - minimum 5 minutes; maximum 90 minutes)
    - Sample Name (limit 64 characters of Alpha numeric input)
3. Clicking on a plate well will populate the entry fields with the associated values; clicking an empty well will fill in the Well Location field only
4. Provide Add/Remove buttons
    - Clicking the Add button will associate the values in the entry fields with a well on the plate
    - Clicking the Remove button will clear the well on the plate
5. Color the wells by sample name; for example, if you used the same sample name in all your wells, then all the wells will be rendered with the same color. If you used three unique sample names across the plate, then each well would have one of three colors, depending on the associated sample name. You may choose whatever color set you'd like.
 
* Javascript or Typescipt ok
* Bonus points if you use d3.js or Canvas to render plate and wells
* Partial credit will be afforded review, if you use a grid widget to represent the plate
* Provide a link to your solution
* How would you go about testing your design and code