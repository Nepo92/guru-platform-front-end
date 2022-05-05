class MotivationTemplates {
  motivationBlockTemplate(item, props) {
    const { departments, positions } = props;

    const dep = departments.filter((el) => el.id === item.idDepartment)[0];

    let pos;

    Object.entries(positions).forEach((subj) => {
      const depart = subj[0];
      const position = subj[1];

      position.forEach((elem) => {
        if (depart === dep.department) {
          if (elem.id === item.idPosition) {
            pos = elem.title;
          }
        }
      });
    });

    return `
        <div class="motivation-now__head">
          <span class="motivation-now__name motivation__title" title="${item.motivationName}">${item.motivationName}</span>
          <span class="motivation-now__icon"></span>
        </div>
        <div class="motivation-now__department">${dep.title}</div>
        <div class="motivation-now__position">${pos}</div>
        <div class="motivation-now__control">
          <input type="hidden" name="idCompany" value="${item.idCompany}" class="motivation-now__company">
          <input type="hidden" name="id" value="${item.id}" class="motivation-now__wage">
          <input type="hidden" name="position" value="${item.idPosition}" class="motivation-now__position-id">
          <input type="hidden" name="department" value="${item.idDepartment}" class="motivation-now__department-id">
        </div>
    `;
  }
}

export default MotivationTemplates;
