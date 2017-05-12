# Portfolio Install Instructions

* Save a copy of your **portfolio-production** folder to the desktop
* In your **Sites** directory, install the portfolio-html files from Git by typing
```
$ git clone git@github.com:JayJohnson1/portfolio-html.git
```
* copy the **img** and **video** from the **portfolio-production** folder into the portfolio-html folder

* In the **Sites/portfolio-html** directory unpack the node_modules by typing
```
$ npm install
```
* Start up **Gulp** and **Browsersync** by typing
```
$ gulp
```
* Commit your changes to the remote repo but make sure to checkout the styles.css.map file after running Gulp
```
$ git checkout -- assets/dest/css/assets/dest/css/styles.css.map
```
