const separatorLine = document.querySelector(".line__wrapper")
const separatorLineBrand = Array.from(separatorLine.children)

separatorLineBrand.forEach((item) => {
    const duplicateNode = item.cloneNode(true)
    duplicateNode.setAttribute("aria-hidden", true)
    separatorLine.appendChild(duplicateNode)
})