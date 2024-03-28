FrontEnd Task

Working with Objects

Technical Specifications

Use react + redux

Input Parameters

Numbers M, N, X

Preparation

Create a matrix M*N (rows, columns)

The value of the intersection is an object with a unique identifier ID and the amount of Amount: int (3-digit random)

Find the sum of each row M and the average for each column N

Table Output

Display the resulting data in a table with good UX. The main cells of the table display Amount, previously automatically generated, the sum of rows M on the right, and the average of columns N below.

Cell Dynamics

When clicking on a cell, increase the Amount value by 1 and accordingly change the average of this column and the sum of this row.

When hovering over a cell, highlight X cells, the Amount of which is closest to the Amount of the current cell.

When hovering over a row sum cell, replace the values of the cells with the percentage of their contribution to the total sum and add a background: a bar that visually shows the percentage. Essentially color part of the cell.

Row Dynamics

Allow deleting a row from the table, with changes in the average values for each column.

Allow adding a row, essentially M+1. In this case, the row is filled according to all the rules of the table.





