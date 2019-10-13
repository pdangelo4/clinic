var calendarID = 'calendar-app';
$(function() {
    var tmpIdCtr = 1;
    var eventSelectedId = null;
    var calendar;

    initCalendar();
    initFormEvents();

    function initFormEvents() {
        var $modalForm = $('#calendar-form');

        /**
         * Delete
         */
        $modalForm.find('#calendar-btn-remove').click(function(e) {
            var eventData = calendar.getEventById(eventSelectedId);

            $.ajax({
                url: '/appointment/events/' + eventSelectedId,
                type: 'delete',
                dataType: 'json',
                success: function() {
                    if (eventData) eventData.remove();
                    closeModal();
                },
                error: function() {
                    alert('Error');
                }
            });
        });

        /**
         * update and create
         */
        $modalForm.find('#calendar-btn-save').click(function(e) {
            e.preventDefault();
            var title = $modalForm.find('#c-title').val();
            var startDate = $modalForm.find('#c-startDate').val();
            var endDate = $modalForm.find('#c-endDate').val();
            var data = {
                title,
                startDate: new Date(startDate).toJSON(),
                endDate: new Date(endDate).toJSON()
            };
            console.log(data);
            console.log({ selectedId: eventSelectedId });
            var isCreateMode = ('' + eventSelectedId).indexOf('tmp-') > -1;
            console.log('isCreateMode', isCreateMode);
            if (!isCreateMode) {
                $.ajax({
                    url: '/appointment/events/' + eventSelectedId,
                    type: 'patch',
                    data: data,
                    dataType: 'json',
                    success: function(data) {
                        if (!data) return;
                        updateCalendarEvent(eventSelectedId, data);
                        eventSelectedId = null;
                        closeModal();
                    }
                });
            } else {
                $.ajax({
                    url: '/appointment/events',
                    type: 'post',
                    data: data,
                    dataType: 'json',
                    success: function(data) {
                        if (!data) return;
                        updateCalendarEvent(eventSelectedId, data);
                        eventSelectedId = null;
                        closeModal();
                    }
                });
            }
        });
    }

    function closeModal() {
        $('a[rel="modal:close"]').click();
    }

    function updateCalendarEvent(eventId, data) {
        var eventData = calendar.getEventById(eventId);
        eventData.setProp('id', data.id);
        eventData.setProp('title', data.title);
        eventData.setStart(new Date(data.start));
        eventData.setEnd(new Date(data.end));
    }

    function initCalendar() {
        var calendarEl = document.getElementById(calendarID);

        calendar = new FullCalendar.Calendar(calendarEl, {
            plugins: ['interaction', 'dayGrid', 'timeGrid', 'list'],
            height: 'parent',
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            },
            defaultView: 'dayGridMonth',
            defaultDate: new Date(),
            navLinks: true, // can click day/week names to navigate views
            editable: true,
            eventLimit: true, // allow "more" link when too many events,
            selectable: true,
            selectMirror: true,
            select: function(arg) {
                console.log({ select: arg });
                eventSelectedId = arg.id || 'tmp-' + tmpIdCtr++;
                calendar.addEvent({
                    id: eventSelectedId,
                    title: 'New Event ',
                    start: arg.start,
                    end: arg.end,
                    allDay: arg.allDay
                });
                calendar.unselect();
            },

            events: {
                url: '/appointment/events'
            },
            eventClick: function(e) {
                var event = e.event;
                var dateformat = 'yyyy-MM-ddThh:mm';
                console.log('selected event', event);
                var $modalForm = $('#calendar-form');
                eventSelectedId = event.id;
                $modalForm.find('#c-title').val(event.title);
                $modalForm
                    .find('#c-startDate')
                    .val($.format.date(event.start, dateformat));
                $modalForm
                    .find('#c-endDate')
                    .val($.format.date(event.end, dateformat));
                $modalForm.modal({});
            }
        });

        calendar.render();
    }
});
