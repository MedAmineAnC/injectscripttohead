const script = document.createElement("script");
script.onreadystatechange = handler;
script.onload = handler;

document.getElementsByName("head")[0].appendChild(script);

function handler() {
  console.log("This is coming from script tag API");
}
