// replace these values with those generated in your TokBox Account
var apiKey = "46832434";
var sessionId =
  "2_MX40NjgzMjQzNH5-MTU5NDMwMzIxMDUwMn53NnZuZS9sbWtmaWpSTVJmb1FwNlFzeGR-fg";
var token =
  "T1==cGFydG5lcl9pZD00NjgzMjQzNCZzaWc9NmEwNWU5N2NkOTgyNTExYjE5NDFiZDIyNTI1ODlhYmE0MzBhNmFjNDpzZXNzaW9uX2lkPTJfTVg0ME5qZ3pNalF6Tkg1LU1UVTVORE13TXpJeE1EVXdNbjUzTm5adVpTOXNiV3RtYVdwU1RWSm1iMUZ3TmxGemVHUi1mZyZjcmVhdGVfdGltZT0xNTk0MzAzMjQ2Jm5vbmNlPTAuNjU2NTE3NDkxNTcyNjk1JnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE1OTQzMDY4NDQmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=";

// (optional) add server code here
initializeSession();

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream

  session.on("streamCreated", function(event) {
    session.subscribe(
      event.stream,
      "subscriber",
      {
        insertMode: "append",
        width: "100%",
        height: "100%",
      },
      handleError
    );
  });

  // Create a publisher
  var publisher = OT.initPublisher(
    "publisher",
    {
      insertMode: "append",
      width: "100%",
      height: "100%",
    },
    handleError
  );

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}
