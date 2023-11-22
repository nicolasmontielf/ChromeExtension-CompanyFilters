let observer;
let bannedCompanies = []

chrome.storage.onChanged.addListener((changes) => {
    const { newValue } = changes.list;
    if (newValue && newValue.length > 0) {
        bannedCompanies = newValue;
    }
    main()
});

async function handleObserver() {
    const exists = await chrome.storage.local.get('list')
    bannedCompanies = exists ? exists.list : []
    const bodySelector = document.querySelector("body");

    observer = new MutationObserver(main);

    // Start observing the target node for configured mutations
    observer.observe(bodySelector, { childList: true, subtree: true });
}

function main() {
    const containerElement = document.querySelector("ul.scaffold-layout__list-container");
    if (!containerElement) {
        return;
    }

    const jobs = containerElement.querySelectorAll("li.jobs-search-results__list-item") ?? []

    jobs.forEach((job) => {
        const companyNameElement = job.querySelector("span.job-card-container__primary-description ");
        if (!companyNameElement) {
            return;
        }

        const companyName = companyNameElement.textContent ?? '';
        const parsedCompanyName = companyName.replace('\n', '').trim()

        if (bannedCompanies.includes(parsedCompanyName.toUpperCase())) {
            job.style.display = "none";
        } else {
            job.style.display = "block";
        }
    })
}

handleObserver()