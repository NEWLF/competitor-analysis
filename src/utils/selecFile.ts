export async function selectFile() {
  return new Promise<File>((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = () => {
      if (!input.files) {
        return;
      }
      const file = input.files[0];
      const reader = new FileReader();

      reader.onloadend = function () {
        if (reader.result) {
        }
      };
      reader.readAsDataURL(file);
      resolve(file);
    };
    input.click();
  });
}
