// We need to track and update the header, the nav links, and the page sections
const header = document.querySelector('[data-header]')
const sections = [...document.querySelectorAll('[data-section]')]
const headerLinks = [...document.querySelectorAll('[data-link]')]

// Track and compare the last and current scroll direction
let prevYPosition = 0
let direction = 'up'


// Use the header as a margin so the intersection observer doesn't fire until the section scrolls past it
const options = {
	rootMargin: `${header.offsetHeight * -1}px`,
	threshold: 0
}

// Find and track the next target section when scrolling
const getTargetSection = (entry) => {
	const index = sections.findIndex((section) => section == entry.target)

	if (index >= sections.length - 1) {
	return entry.target
	} else {
	return sections[index + 1]
	}
}

// Update the global colour theme using a data attribute
const updateColors = (target) => {
	const theme = target.dataset.section
	header.setAttribute('data-theme', theme)
}

// Check whether or not we need to update the current target
const shouldUpdate = (entry) => {
	if (direction === 'down' && !entry.isIntersecting) {
		return true
	}

	if (direction === 'up' && entry.isIntersecting) {
		return true
	}

	return false
}

// Update the nav marker by:
// 1. getting the current section name
// 2. finding the nav item with that id
// 3. getting the relative position of that item within the nav
// 3. drawing an absolutely positioned line above it
const updateMarker = (target) => {
	const id = target.id

	if (!id) return

	let link = headerLinks.find((el) => {
		return el.getAttribute('href') === `#${id}`
	})

	link = link || headerLinks[0]

	const distanceFromLeft = link.getBoundingClientRect().left

	header.style.setProperty('--markerWidth', `${link.offsetWidth}px`)
	header.style.setProperty('--markerLeft', `${distanceFromLeft}px`)
}

// Run the observer, verify the scroll direction, update the entry when conditions pass
const onIntersect = (entries) => {
	entries.forEach((entry) => {
		if (window.scrollY > prevYPosition) {
			direction = 'down'
		} else {
			direction = 'up'
		}

		prevYPosition = window.scrollY

		const target = direction === 'down' ? getTargetSection(entry) : entry.target

		if (shouldUpdate(entry)) {
			updateColors(target)
			updateMarker(target)
		}
	})
}

// Only update the nav marker after the new target has finished updating (when the colour theme has been changed and the scrolling has finished)
document.addEventListener('readystatechange', e => {
	if (e.target.readyState === 'complete') {
    updateMarker(sections[0])
	}
})

// Create our observer instance and pass in the sections to watch
const observer = new IntersectionObserver(onIntersect, options)

sections.forEach((section) => {
	observer.observe(section)
})



//OBSERVER FOR CLAMP

// Select all elements with the data-observe-clamp attribute
const clampElements = document.querySelectorAll('.clamp-text');

// Create an Intersection Observer
const clampObserver = new IntersectionObserver((entries) => {
	
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			// If the element is in view, add the 'expanded' class
			entry.target.classList.add('expanded');
		} else {
			// If the element is out of view, remove the 'expanded' class
			entry.target.classList.remove('expanded');
		}
	});
}, {
  threshold: .1 // Trigger when 10% of the element is visible
});

// Observe each clamp element
clampElements.forEach(el => clampObserver.observe(el));




//OBSERVER FOR SECTION 3 HEADER

// Select all elements with the data-observe-clamp attribute
const headerElements = document.querySelectorAll('.animated-header');

// Create an Intersection Observer
const headerObserver = new IntersectionObserver((entries) => {
	
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('animate');
		} else {
			entry.target.classList.remove('animate');
		}
	});
}, {
  threshold: .1 // Trigger when 10% of the element is visible
});

headerElements.forEach(el => headerObserver.observe(el));



//--------------------------------



// Select all elements with the data-observe-clamp attribute
const animatedText = document.querySelectorAll('.animated-title');

// Create an Intersection Observer
const bigTitle = new IntersectionObserver((entries) => {
	
	entries.forEach(entry => {
		if (entry.isIntersecting) {
      	// If the element is in view, add the 'expanded' class
		entry.target.classList.add('animation');
    } else {
      	// If the element is out of view, remove the 'expanded' class
		entry.target.classList.remove('animation');
    }
	});
}, {
  threshold: .1 // Trigger when 10% of the element is visible
});

// Observe each clamp element
animatedText.forEach(el => bigTitle.observe(el));


const vid = document.querySelector('#video');

// Create an Intersection Observer
const videostart = new IntersectionObserver((entries) => {

	entries.forEach(entry => {
		if (entry.isIntersecting) {

		entry.target.classList.add('visible');
		if (entry.target.classList.contains('visible')) {
			entry.target.play();
		}
    } else {
		entry.target.pause();
    }
	});
}, {
	threshold: 0.5 
});

// Observe the video element
videostart.observe(vid);