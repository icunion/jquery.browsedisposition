jquery.browsedisposition
========================

A jQuery plugin to determine the browse disposition of the site visitor. It
uses HTML5 local storage to store a record about the last page a user visited
on the site and when they visited, and uses this information to determine
whether the user is visiting for the first time, browsing to a new page, or
refreshing the current page.

The use case is for taking actions when a user visits the site for the first
time, but not when moving between pages.

## Usage

The plugin implements a function `jQuery.browseDisposition()`, which returns
one of the following strings:

 * `firstVisit`: Returned when the page request is the first time the user
   has visited the site, or if the timeout since their last visit has expired.
 * `pageRefresh`: Returned when the user refreshes the page they are currently
   on.
 * `siteBrowse`: Returned when the user browses to a different page on the
   site.

The default timeout for expiring old visits is one hour. The idea is that the
first visit is roughly per browsing session, so leaving for an hour and
coming back would constitute a new browsing session. Better mechanisms exist
for determining true 'has never been to this site ever' first visits.

## Example

http://jsfiddle.net/t4Hp7/

